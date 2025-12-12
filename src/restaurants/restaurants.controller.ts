import { Controller, Post, Body, Get, Query, Param, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private service: RestaurantsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get('near')
  async near(@Query('lng') lng: string, @Query('lat') lat: string) {
    const coords: [number, number] = [parseFloat(lng), parseFloat(lat)];
    return this.service.findNear(coords);
  }

  @Get()
  async list() {
    return this.service.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
