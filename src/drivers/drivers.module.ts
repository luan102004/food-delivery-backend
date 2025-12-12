import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './driver.schema';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { PusherModule } from '../common-services/pusher.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
    PusherModule, // 👈 Quan trọng
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}