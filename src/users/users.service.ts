import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  async findOrCreateFromOAuth({ email, displayName }: { email: string; displayName: string }) {
    let user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      user = await this.userModel.create({ email, name: displayName });
    }
    return user;
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async create(data: any) {
    return this.userModel.create(data);
  }

  async update(id: string, data: any) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async list() {
    return this.userModel.find().exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
