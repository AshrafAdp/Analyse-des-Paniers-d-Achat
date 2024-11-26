import express, { Request, Response } from 'express';
import Product from '../models/Products'; 
const router = express.Router(); 

// Créer un produit
router.post('/products', async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

// Obtenir tous les produits
router.get('/products', async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

// Obtenir un produit par ID
router.get('/products/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Produit non trouvé' });
      return;
    }
    res.status(200).json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

// Mettre à jour un produit
router.put('/products/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Produit non trouvé pour la mise à jour' });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

// Supprimer un produit
router.delete('/products/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Produit non trouvé pour la suppression' });
      return;
    }
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
});

export default router;
