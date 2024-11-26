
## Description

Ce projet se compose de deux parties principales :
- **Backend** : Un serveur Node.js avec Express.js pour gérer les produits, les ventes, et les analyses des données.
- **Frontend** : Une interface utilisateur développée en Vue.js pour visualiser les données et analyser les ventes et les produits.

## Technologies utilisées

- **Backend** : Node.js, Express.js, MongoDB
- **Frontend** : Vue.js
- **Base de données** : MongoDB

## Installation

### Prérequis

- Node.js installé (version 14 ou supérieure)
- MongoDB installé ou une instance MongoDB en ligne



### Backend (Node.js + TypeScript)
#### Endpoints API

- `GET /analytics/total_sales` : Retourne le montant total des ventes pour la période sélectionnée.
- `GET /analytics/trending_products` : Retourne les 3 produits les plus vendus, triés par quantité.
- `GET /analytics/category_sales` : Retourne la répartition des ventes par catégorie.
- `POST /sales` : Crée une nouvelle vente.
- `GET /sales` : Récupère toutes les ventes.
- `GET /sales/:id` : Récupère une vente par son ID.
- `PUT /sales/:id` : Met à jour une vente existante.
- `DELETE /sales/:id` : Supprime une vente par son ID.
  
#### Fonctionnalités de traitement de données
- Agrégation des ventes par produit.
- Calcul des pourcentages des ventes par catégorie.

### Base de données
- MongoDB est utilisé pour stocker les données des produits et des ventes.

## Prérequis

- Node.js 18+
- TypeScript
- MongoDB

## Installation

1. Clonez ce repository :
   ```bash
   git clone https://github.com/AshrafAdp/Analyse-des-Paniers-d-Achat.git
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Créez un fichier `.env` pour la configuration de MongoDB :
   ```bash
   MONGO_URI="votre_chaine_de_connexion_mongodb"
   PORT=3000
   ```

4. Lancez le serveur :
   ```bash
   npm run start
   ```

## Documentation des Routes API

### `api/analytics/total_sales`
- **Méthode** : `GET`
- **Description** : Retourne le montant total des ventes pour la période sélectionnée.

### `api/analytics/trending_products`
- **Méthode** : `GET`
- **Description** : Retourne les 5 produits les plus vendus.

### `api/analytics/category_sales`
- **Méthode** : `GET`
- **Description** : Retourne la répartition des ventes par catégorie.

### `api/products`
- **Méthode** : `POST`
- **Description** : Crée un nouveau produit.
- **Corps de la requête** :
  ```json
  {
    "ProductID": "number",
    "ProductName": "string",
    "Category": "string",
    "Price": "number"
  }
  ```

### `api/products`
- **Méthode** : `GET`
- **Description** : Récupère tous les produits.

### `api/products/:id`
- **Méthode** : `GET`
- **Description** : Récupère un produit par son ID.

### `api/sales`
- **Méthode** : `POST`
- **Description** : Crée une nouvelle vente.
- **Corps de la requête** :
  ```json
  {
    "ProductID": "number",
    "Quantity": "number",
    "Date": "Date",
    "TotalAmount": "number"
  }
  ```

### `api/sales`
- **Méthode** : `GET`
- **Description** : Récupère toutes les ventes.

### `api/sales/:id`
- **Méthode** : `GET`
- **Description** : Récupère une vente par son ID.

## Déploiement

1. Assurez-vous que MongoDB est en fonctionnement et accessible.
2. Exécutez les scripts nécessaires pour peupler la base de données avec les données fournies dans le projet.
3. Déployez le serveur sur votre infrastructure (par exemple, Heroku, AWS).

## Contribution

Les contributions sont les bienvenues. Pour ajouter des fonctionnalités ou corriger des bugs, veuillez ouvrir une issue ou une pull request.

---

## Auteur

- NASSIF Achraf

