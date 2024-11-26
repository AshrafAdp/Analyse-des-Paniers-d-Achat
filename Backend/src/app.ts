  import mongoose from 'mongoose';
  import { parse } from 'csv-parse/sync';
  import fs from 'fs/promises';
  import Product, { IProduct } from './models/Products'; // Importation du modèle Product
  import Sale, { ISale } from './models/Sales'; // Importation du modèle Sale

  const BATCH_SIZE = 1000; // Taille des lots pour les opérations batch

  // Fonction pour charger les données CSV
  export async function loadCSVData(): Promise<void> {
    try {
      // Lire les fichiers CSV en parallèle
      const [productsData, salesData] = await Promise.all([
        fs.readFile('./data/products.csv', 'utf8'),
        fs.readFile('./data/sales.csv', 'utf8')
      ]);

      // Parse les données des produits
      const productsRows: IProduct[] = parse(productsData, { columns: true });
      if (!productsRows || productsRows.length === 0) {
        throw new Error('No data found in products.csv');
      }

      // Insertion ou mise à jour des produits
      await insertProducts(productsRows);

      // Parse les données des ventes
      const salesRows: ISale[] = parse(salesData, { columns: true });
      if (!salesRows || salesRows.length === 0) {
        throw new Error('No data found in sales.csv');
      }

      // Insertion ou mise à jour des ventes
      await insertSales(salesRows);

      console.log('CSV data loaded successfully');
    } catch (error) {
      console.error('Error loading CSV data:', error);
    }
  }

  // Fonction pour insérer ou mettre à jour les produits
  async function insertProducts(productsRows: IProduct[]): Promise<void> {
    const productBatches = [];
    
    // Crée des lots de produits pour l'insertion en plusieurs requêtes
    for (let i = 0; i < productsRows.length; i += BATCH_SIZE) {
      productBatches.push(productsRows.slice(i, i + BATCH_SIZE));
    }

    // Insertion ou mise à jour des produits en utilisant bulkWrite
    await Promise.all(
      productBatches.map(batch => Product.bulkWrite(
        batch.map(row => ({
          updateOne: {
            filter: { ProductID: row.ProductID },  // Recherche par ProductID
            update: { $set: row }, // Met à jour le produit
            upsert: true // Insère si le produit n'existe pas
          }
        }))
      ))
    );
  }

  // Fonction pour insérer ou mettre à jour les ventes
  async function insertSales(salesRows: ISale[]): Promise<void> {
    const saleBatches = [];
    
    // Crée des lots de ventes pour l'insertion en plusieurs requêtes
    for (let i = 0; i < salesRows.length; i += BATCH_SIZE) {
      saleBatches.push(salesRows.slice(i, i + BATCH_SIZE));
    }

    // Insertion ou mise à jour des ventes en utilisant bulkWrite
    await Promise.all(
      saleBatches.map(batch => Sale.bulkWrite(
        batch.map(row => ({
          updateOne: {
            filter: { SaleID: row.SaleID },  // Recherche par SaleID
            update: { $set: row }, // Met à jour la vente
            upsert: true // Insère si la vente n'existe pas
          }
        }))
      ))
    );
  }
