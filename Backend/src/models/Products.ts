import mongoose from 'mongoose';

export interface IProduct {
  ProductID: number;
  ProductName: string;
  Category: string;
  Price: number;
}

const productSchema = new mongoose.Schema<IProduct>({
  ProductID: { type: Number, required: true, unique: true },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
