import { Controller, Patch, Param, Body } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly service: DriversService) {}

  @Patch(':id/online')
  setOnline(
    @Param('id') id: string,
    @Body('isOnline') isOnline: boolean,
  ) {
    return this.service.setOnline(id, isOnline);
  }

  @Patch(':id/location')
  updateLocation(
    @Param('id') id: string,
    @Body('lat') lat: number,
    @Body('lng') lng: number,
  ) {
    return this.service.updateLocation(id, lat, lng);
  }
}
