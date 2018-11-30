import { Injectable } from '@nestjs/common';
import { Item } from './item';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async create(item: Item) {
    const createdItem = new this.itemModel(item);
    return await createdItem.save();
  }
}
