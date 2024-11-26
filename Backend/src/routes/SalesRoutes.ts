import express, { Request, Response } from 'express';
import Sales from '../models/Sales'; 
import { 
  getVentesParProduit, 
  getPourcentageVentesParCategorie, 
  getTotalSales, 
  getTrendingProducts, 
  getCategorySales, 
  getTotalSalesAmount
  
} from '../controllers/SalesController';

const router = express.Router(); 




// Route pour obtenir les ventes par produit
router.get('/ventes-par-produit', getVentesParProduit);

// Route pour obtenir le pourcentage des ventes par catégorie
router.get('/pourcentage-ventes-par-categorie', getPourcentageVentesParCategorie);

// Route pour obtenir le Total des ventes pour la période sélectionnée
router.get('/analytics/total_sales', getTotalSales);

// Route pour obtenir  Produits tendance (top 5)
router.get('/analytics/trending_products', getTrendingProducts);
// Route pour obtenir le totale des ventes
router.get('/analytics/totals_sales', getTotalSalesAmount);

// Route pour obtenir la Répartition des ventes par catégorie
router.get('/analytics/category_sales', getCategorySales);
router.post('/sales', async (req: Request, res: Response): Promise<void> => {
  try {
    const { ProductID, Quantity, Date, TotalAmount } = req.body;
    
    // Création d'une nouvelle vente avec les données fournies
    const newSale = new Sales({
      ProductID,
      Quantity,
      Date,
      TotalAmount
    });

    await newSale.save(); 
    res.status(201).json(newSale); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

// Obtenir toutes les ventes
router.get('/sales', async (req: Request, res: Response): Promise<void> => {
  try {
    const sales = await Sales.find(); 
    res.status(200).json(sales);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

// Obtenir une vente par son ID
router.get('/sales/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const sale = await Sales.findById(req.params.id); 
    if (!sale) {
      res.status(404).json({ message: 'Vente non trouvée' });
      return;
    }
    res.status(200).json(sale); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

// Mettre à jour une vente
router.put('/sales/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { ProductID, Quantity, Date, TotalAmount } = req.body;
    
    // Mise à jour de la vente en fonction de l'ID
    const updatedSale = await Sales.findByIdAndUpdate(
      req.params.id,
      { ProductID, Quantity, Date, TotalAmount },
      { new: true }
    );

    if (!updatedSale) {
      res.status(404).json({ message: 'Vente non trouvée pour la mise à jour' });
      return;
    }
    res.status(200).json(updatedSale); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

// Supprimer une vente
router.delete('/sales/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSale = await Sales.findByIdAndDelete(req.params.id); 
    if (!deletedSale) {
      res.status(404).json({ message: 'Vente non trouvée pour la suppression' });
      return;
    }
    res.status(200).json({ message: 'Vente supprimée avec succès' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

export default router;
