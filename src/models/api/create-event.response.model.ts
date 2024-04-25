import { EventModel } from '../event.model';
import { UserModel } from '../user.model';

export class CreateEventResponse {
  userId: UserModel;
  event: EventModel;
}
