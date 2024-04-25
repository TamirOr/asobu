import { Injectable } from '@nestjs/common';
import { EventModel } from 'src/models/event.model';

@Injectable()
export class PushNotificationService {
  async notifyInvitedUser(event: EventModel) {
    console.log(`notify guests about ${event}`);
    throw new Error('Method not implemented.');
  }

  async notifyCreator(event: EventModel, userId: string) {
    console.log(`notify about ${event} user- ${userId} answered`);
    throw new Error('Method not implemented.');
  }
}
