import { EventModel } from './event.model';

export class UserModel {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneToken: string;
  createdEvents: EventModel[];
  invitedEvents: EventModel[];
}
