import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Driver extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: false })
  isOnline: boolean;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  })
  location: { type: 'Point'; coordinates: number[] };
}

export const DriverSchema = SchemaFactory.createForClass(Driver);

DriverSchema.index({ location: '2dsphere' });
