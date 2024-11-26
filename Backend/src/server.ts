import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productsRoutes from './routes/ProductsRoutes';
import salesRoutes from './routes/SalesRoutes';
import { loadCSVData } from './app';
import cors from 'cors'; 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Utilisation des routes
app.use('/api', productsRoutes);
app.use('/api', salesRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce4')
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      // Charger les données CSV après la connexion
      await loadCSVData();
      console.log('Data successfully loaded');
      // Démarrer le serveur une fois que les données sont chargées
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
