import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Schema } from 'mongoose';

const MenuItemSchema = new Schema({
  restaurantId: String,
  name: String,
  description: String,
  price: Number,
  images: [String],
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

@Module({
  imports: [MongooseModule.forFeature([{ name: 'MenuItem', schema: MenuItemSchema }])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
