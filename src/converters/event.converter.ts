import { EventModel } from 'src/models/event.model';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { UserEntity } from '../entities/user.entity';
import { GuestEntity } from 'src/entities/guest.entity';
import { GuestModel } from 'src/models/guest.model';
import { EventEntity } from 'src/entities/event.entity';

@Injectable()
export class EventConverter {
  eventEntityToModel = (event: EventEntity): EventModel => ({
    id: event.id,
    name: event.name,
    location: event.location,
    timeOfEvent: event.timeOfEvent,
    creator: this.userEntityToModel(event.creator),
    guests: event.guests.map((guest) => this.guestEntityToModel(guest)),
    additionalData: event.additionalData,
  });

  eventModelToEntity = (model: EventModel): EventEntity => ({
    id: model.id,
    name: model.name,
    location: model.location,
    timeOfEvent: model.timeOfEvent,
    creator: this.userModelToEntity(model.creator),
    guests: model.guests.map((guest) => this.guestModelToEntity(guest)),
    additionalData: model.additionalData,
    createdAt: undefined,
    updatedAt: undefined,
  });

  userEntityToModel = (user: UserEntity): UserModel => ({
    userId: user.userId,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    phoneToken: user.phoneToken,
    createdEvents: user.createdEvents.map((event) =>
      this.eventEntityToModel(event),
    ),
    invitedEvents: user.invitedEvents.map((event) =>
      this.eventEntityToModel(event),
    ),
  });

  userModelToEntity = (model: UserModel): UserEntity => ({
    userId: model.userId,
    userName: model.userName,
    firstName: model.firstName,
    lastName: model.lastName,
    email: model.email,
    password: model.password,
    phoneToken: model.phoneToken,
    createdEvents: model.createdEvents.map((event) =>
      this.eventModelToEntity(event),
    ),
    invitedEvents: model.invitedEvents.map((event) =>
      this.eventModelToEntity(event),
    ),
    createdAt: undefined,
  });

  guestEntityToModel = (guest: GuestEntity): GuestModel => ({
    eventId: guest.eventId,
    userId: guest.userId,
    response: guest.response,
  });

  guestModelToEntity = (model: GuestModel): GuestEntity => ({
    eventId: model.eventId,
    userId: model.userId,
    response: model.response,
    event: new EventEntity(),
    user: new UserEntity(),
  });
}
