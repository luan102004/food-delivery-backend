import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(@InjectModel('Restaurant') private model: Model<any>) {}

  async create(data: any) {
    return this.model.create(data);
  }

  async update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async findNear(coordinates: [number, number], maxDistance = 5000) {
    return this.model.find({
      location: {
        $near: { $geometry: { type: 'Point', coordinates }, $maxDistance: maxDistance },
      },
    }).exec();
  }

  async findById(id: string) {
    return this.model.findById(id).exec();
  }

  async list() {
    return this.model.find().exec();
  }
}
