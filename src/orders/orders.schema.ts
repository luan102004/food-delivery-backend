import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  customerId: String,
  restaurantId: String,
  driverId: { type: String, default: null },
  items: [
    {
      menuItemId: String,
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ['Placed','Accepted','Prepared','PickedUp','InTransit','Delivered','Cancelled'],
    default: 'Placed',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function (next) {
  // @ts-ignore
  this.updatedAt = new Date();
  next();
});
