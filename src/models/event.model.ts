import { UserModel } from './user.model';
import { GuestModel } from './guest.model';

export class EventModel {
  id: string;
  name: string;
  location: string;
  timeOfEvent: Date;
  creator: UserModel;
  guests: GuestModel[];
  additionalData: string;
}
