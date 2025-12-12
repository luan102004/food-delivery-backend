import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Schema } from 'mongoose';

const RestaurantSchema = new Schema({
  name: String,
  address: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number] },
  },
  ownerId: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
RestaurantSchema.index({ location: '2dsphere' });

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Restaurant', schema: RestaurantSchema }])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
