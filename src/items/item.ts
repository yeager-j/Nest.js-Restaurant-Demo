import { Document } from 'mongoose';

export interface Item extends Document {
  name: string;
  price: number;
}
