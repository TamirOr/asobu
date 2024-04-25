import { EventModel } from '../event.model';
import { UserModel } from '../user.model';

export class CreateEventRequest {
  userId: UserModel;
  event: EventModel;
}
