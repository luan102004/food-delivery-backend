import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from './driver.schema';
import { Model } from 'mongoose';
import { PusherService } from '../common-services/pusher.service';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
    private pusher: PusherService,
  ) {}

  async setOnline(driverId: string, isOnline: boolean) {
    const driver = await this.driverModel.findByIdAndUpdate(
      driverId,
      { isOnline },
      { new: true },
    );

    this.pusher.trigger('drivers', 'driver-status', {
      driverId,
      isOnline,
    });

    return driver;
  }

  async updateLocation(driverId: string, lat: number, lng: number) {
    const driver = await this.driverModel.findByIdAndUpdate(
      driverId,
      {
        location: { type: 'Point', coordinates: [lng, lat] },
      },
      { new: true },
    );

    // Realtime cập nhật vị trí tài xế
    this.pusher.trigger('drivers', 'location-update', {
      driverId,
      lat,
      lng,
    });

    return driver;
  }
}
