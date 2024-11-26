import mongoose from 'mongoose';

export interface ISale {
  SaleID: number;
  ProductID: number;
  Quantity: number;
  Date: Date;
  TotalAmount: number;
}

const saleSchema = new mongoose.Schema<ISale>({
  SaleID: { type: Number, required: true, unique: true },
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Date: { type: Date, required: true },
  TotalAmount: { type: Number, required: true }
});

const Sale = mongoose.model<ISale>('Sale', saleSchema);
export default Sale;
