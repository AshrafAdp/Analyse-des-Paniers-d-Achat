import Sales from '../models/Sales';
import Product from '../models/Products'; 
import { Request, Response } from 'express';

// Fonction pour obtenir les ventes par produit
export const getVentesParProduit = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Sales.aggregate([
      {
        $lookup: {
          from: 'products', 
          localField: 'ProductID',
          foreignField: 'ProductID',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      { $group: { _id: '$product.ProductName', totalSales: { $sum: '$TotalAmount' }, totalQuantity: { $sum: '$Quantity' } } },
      { $project: { productName: '$_id', totalSales: 1, totalQuantity: 1 } }
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du calcul des ventes par produit' });
  }
};

// Fonction pour obtenir le pourcentage des ventes par catégorie
export const getPourcentageVentesParCategorie = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const totalVentes = await Sales.aggregate([
      { $group: { _id: null, total: { $sum: '$TotalAmount' } } }
    ]);

    const total = totalVentes.length > 0 ? totalVentes[0].total : 0;

    
    const result = await Sales.aggregate([
      {
        $lookup: {
          from: 'products', 
          localField: 'ProductID',
          foreignField: 'ProductID',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      { $group: { _id: '$product.Category', totalSales: { $sum: '$TotalAmount' } } },
      { $project: { category: '$_id', pourcentage: { $multiply: [{ $divide: ['$totalSales', total] }, 100] } } }
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du calcul des ventes par catégorie' });
  }
};
// Endpoint : Total des ventes pour la période sélectionnée

export const getTotalSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query; 

    
    if (!startDate || !endDate) {
      res.status(400).json({ message: 'Veuillez fournir les dates de début et de fin' });
      return;
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({ message: 'Les dates fournies ne sont pas valides' });
      return;
    }

    const matchQuery: any = {};
    matchQuery.Date = { $gte: start, $lte: end };

    const totalSales = await Sales.aggregate([
      { $match: matchQuery },
      { $group: { _id: null, total: { $sum: '$TotalAmount' } } }
    ]);

   
    const total = totalSales.length > 0 ? totalSales[0].total : 0;
    res.status(200).json({ total: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du calcul du montant total des ventes' });
  }
};


// Endpoint : Produits tendance (top 5)
export const getTrendingProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const topProducts = await Sales.aggregate([
      {
        $lookup: {
          from: 'products', 
          localField: 'ProductID',
          foreignField: 'ProductID',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      { 
        $group: { 
          _id: '$product.ProductName', 
          totalQuantity: { $sum: '$Quantity' }, 
          totalSales: { $sum: '$TotalAmount' } 
        } 
      },
      { $sort: { totalQuantity: -1 } }, 
      { $limit: 5 }, 
      { 
        $project: { 
          productName: '$_id', 
          totalQuantity: 1, 
          totalSales: 1 
        } 
      }
    ]);

    res.status(200).json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du calcul des produits tendance' });
  }
};

// Endpoint : Répartition des ventes par catégorie
export const getCategorySales = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalSales = await Sales.aggregate([
      {
        $lookup: {
          from: 'products', 
          localField: 'ProductID',
          foreignField: 'ProductID',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      { 
        $group: { 
          _id: '$product.Category', 
          totalSales: { $sum: '$TotalAmount' }, 
          totalQuantity: { $sum: '$Quantity' } 
        } 
      }
    ]);

   
    const grandTotal = totalSales.reduce((sum, cat) => sum + cat.totalSales, 0);

    const result = totalSales.map(cat => ({
      category: cat._id,
      totalSales: cat.totalSales,
      totalQuantity: cat.totalQuantity,
      percentage: ((cat.totalSales / grandTotal) * 100).toFixed(2)
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du calcul des ventes par catégorie' });
  }
};

// Endpoint : totale des ventes
export const getTotalSalesAmount = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalSales = await Sales.aggregate([
      { $group: { _id: null, totalAmount: { $sum: '$TotalAmount' } } }
    ]);

    const total = totalSales.length > 0 ? totalSales[0].totalAmount : 0;

    res.status(200).json({ totalSales: total });
  } catch (error) {
    console.error('Erreur lors du calcul du total des ventes:', error);
    res.status(500).json({ message: 'Erreur lors du calcul du total des ventes' });
  }
};

