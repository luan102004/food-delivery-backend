import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PusherService } from '../common-services/pusher.service';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private model: Model<any>, private pusher: PusherService) {}

  async create(data: any) {
    const order = await this.model.create(data);
    // emit real-time event to restaurant channel
    try {
      this.pusher.trigger(`orders-restaurant-${order.restaurantId}`, 'order:created', order);
    } catch (err) {
      console.error(err);
    }
    return order;
  }

  private allowedTransition(current: string, next: string) {
    const map: Record<string, string[]> = {
      Placed: ['Accepted', 'Cancelled'],
      Accepted: ['Prepared', 'Cancelled'],
      Prepared: ['PickedUp', 'Cancelled'],
      PickedUp: ['InTransit', 'Cancelled'],
      InTransit: ['Delivered', 'Cancelled'],
      Delivered: [],
      Cancelled: [],
    };
    return map[current]?.includes(next);
  }

  async updateStatus(id: string, status: string) {
    const order = await this.model.findById(id).exec();
    if (!order) throw new Error('Order not found');
    if (order.status === status) return order;
    if (!this.allowedTransition(order.status, status)) {
      throw new Error(`Invalid status transition: ${order.status} -> ${status}`);
    }
    order.status = status;
    await order.save();
    this.pusher.trigger(`orders-${order._id}`, 'order:status', order);
    return order;
  }

  async assignDriver(orderId: string, driverId: string) {
    const order = await this.model.findByIdAndUpdate(orderId, { driverId, status: 'Accepted' }, { new: true }).exec();
    if (order) this.pusher.trigger(`drivers-${driverId}`, 'order:assigned', order);
    return order;
  }

  async getById(id: string) {
    return this.model.findById(id).exec();
  }

  async listForRestaurant(restaurantId: string) {
    return this.model.find({ restaurantId }).exec();
  }
}
