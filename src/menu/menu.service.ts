import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MenuService {
  constructor(@InjectModel('MenuItem') private model: Model<any>) {}

  async create(data: any) {
    return this.model.create(data);
  }

  async update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async listByRestaurant(restaurantId: string) {
    return this.model.find({ restaurantId }).exec();
  }

  async get(id: string) {
    return this.model.findById(id).exec();
  }

  async remove(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
