import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  private client: Pusher;

  constructor() {
    this.client = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    });
  }

  trigger(channel: string, event: string, payload: any) {
    try {
      return this.client.trigger(channel, event, payload);
    } catch (err) {
      console.error('Pusher trigger error:', err);
    }
  }
}
