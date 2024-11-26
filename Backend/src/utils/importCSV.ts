import mongoose from 'mongoose';
import { parse } from 'csv-parse';
import fs from 'fs/promises';

import Product,{ IProduct } from '../models/Products';
import Sale, { ISale } from '../models/Sales';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce3';

export async function loadCSVData(): Promise<void> {
  try {
    // Connexion à MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Charger et insérer les produits
    const productsData = await fs.readFile('./data/products.csv', 'utf8');
    parse(productsData, { columns: true }, async (err, rows: IProduct[]) => {
      if (err) throw err;
      await Product.insertMany(rows.map(row => ({
        ProductID: row.ProductID,
        ProductName: row.ProductName,
        Category: row.Category,
        Price: parseFloat(row.Price.toString()),
      })));
    });

    // Charger et insérer les ventes
    const salesData = await fs.readFile('./data/sales.csv', 'utf8');
    parse(salesData, { columns: true }, async (err, rows: ISale[]) => {
      if (err) throw err;
      await Sale.insertMany(rows.map(row => ({
        SaleID: row.SaleID,
        ProductID: row.ProductID,
        Quantity: parseInt(row.Quantity.toString(), 10),
        Date: new Date(row.Date),
        TotalAmount: parseFloat(row.TotalAmount.toString()),
      })));
    });

    console.log('Data successfully loaded from CSV files');
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

export async function getSalesData(): Promise<ISale[]> {
  return await Sale.find().exec();
}

export async function getProductsData(): Promise<IProduct[]> {
  return await Product.find().exec();
}
