import { Controller, Post, Body, Patch, Param, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: any) {
    return this.service.create(body);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status);
  }

  @Patch(':id/assign/:driverId')
  @UseGuards(AuthGuard('jwt'))
  async assign(@Param('id') id: string, @Param('driverId') driverId: string) {
    return this.service.assignDriver(id, driverId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async get(@Param('id') id: string) {
    return this.service.getById(id);
  }
}
