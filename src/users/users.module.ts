import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  role: { type: String, enum: ['customer','restaurant','driver','admin'], default: 'customer' },
  createdAt: { type: Date, default: Date.now },
});

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
