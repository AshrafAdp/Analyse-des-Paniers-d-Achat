import Sales from '../models/Sales';
import Products from '../models/Products';

export async function getVentesParProduit() {
  try {
    const ventesParProduit = await Sales.aggregate([
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
        $project: {
          ProductID: 1,
          ProductName: '$product.ProductName',
          PrixUnitaire: '$product.Price',
          QuantiteVendue: 1,
          MontantTotal: { $multiply: ['$product.Price', '$Quantity'] }
        }
      },
      {
        $group: {
          _id: '$ProductID',
          Produit: { $first: '$ProductName' },
          TotalVentes: { $sum: '$MontantTotal' },
          QuantiteTotale: { $sum: '$QuantiteVendue' }
        }
      },
      { $sort: { TotalVentes: -1 } }
    ]);
    return ventesParProduit;
  } catch (error) {
    console.error('Erreur lors de l\'agrégation des ventes par produit:', error);
    throw error;
  }
}

export async function getPourcentageVentesParCategorie() {
  try {
    const totalVentes = await Sales.aggregate([
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
        $project: {
          Category: '$product.Category',
          MontantTotal: { $multiply: ['$product.Price', '$Quantity'] }
        }
      },
      { $group: { _id: null, VentesTotales: { $sum: '$MontantTotal' } } }
    ]);

    const ventesTotales = totalVentes.length > 0 ? totalVentes[0].VentesTotales : 0;

    const ventesParCategorie = await Sales.aggregate([
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
        $project: {
          Category: '$product.Category',
          MontantTotal: { $multiply: ['$product.Price', '$Quantity'] }
        }
      },
      { $group: { _id: '$Category', TotalVentesCategorie: { $sum: '$MontantTotal' } } }
    ]);

    const result = ventesParCategorie.map(categorie => ({
      Category: categorie._id,
      PourcentageVentes: (categorie.TotalVentesCategorie / ventesTotales) * 100
    }));

    return result;
  } catch (error) {
    console.error('Erreur lors de l\'agrégation des ventes par catégorie:', error);
    throw error;
  }
}
