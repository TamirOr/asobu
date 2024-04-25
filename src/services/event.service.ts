import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventConverter } from 'src/converters/event.converter';
import { CreateEventRequest } from 'src/models/api/create-event.request.model';
import { CreateEventResponse } from 'src/models/api/create-event.response.model';
import { FindEventsRequest } from 'src/models/api/find-events.request.model';
import { FindEventsResponse } from 'src/models/api/find-events.response.model';
import { Repository } from 'typeorm';
import { UpdateEventRequest } from 'src/models/api/update-event.request.model';
import { EventEntity } from 'src/entities/event.entity';
import { GuestEntity } from 'src/entities/guest.entity';
import { UpdateEventResponse } from 'src/models/api/update-event.response.model';
import { PushNotificationService } from './push-notification.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
    private readonly pushNotificationService: PushNotificationService,
    private readonly dto: EventConverter,
  ) {}

  async updateEvent(request: UpdateEventRequest): Promise<UpdateEventResponse> {
    const eventEntity: EventEntity = await this.repository.findOne({
      where: { id: request.eventId },
      relations: ['creator', 'guests'],
    });

    const guest = eventEntity.guests.find(
      ({ userId }) => userId === request.userId,
    );

    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const updatedEvent: EventEntity = {
        ...eventEntity,
        guests: this.updateGuestResposne(eventEntity.guests, guest),
      };

      const savedEvent = await this.repository.save(updatedEvent);

      await this.pushNotificationService.notifyCreator(
        savedEvent,
        request.userId,
      );
      await queryRunner.commitTransaction();
      return { updatedEvent: this.dto.eventEntityToModel(savedEvent) };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  updateGuestResposne(
    guests: GuestEntity[],
    updatedGuest: GuestEntity,
  ): GuestEntity[] {
    return guests.map((guest) => {
      return guest.userId === updatedGuest.userId ? updatedGuest : guest;
    });
  }
  async createEvent(request: CreateEventRequest): Promise<CreateEventResponse> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const eventEntity = this.dto.eventModelToEntity(request.event);
      const savedEvent = await queryRunner.manager.save(eventEntity);
      await this.pushNotificationService.notifyInvitedUser(request.event);
      await queryRunner.commitTransaction();
      return {
        userId: request.userId,
        event: this.dto.eventModelToEntity(savedEvent),
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findEvents(request: FindEventsRequest): Promise<FindEventsResponse> {
    const events = await this.repository.find({
      where: {
        creator: { userId: request.userId },
      },
      relations: ['creator', 'guests'], // Load the creator relationship
    });

    return {
      events: events.map((event) => this.dto.eventEntityToModel(event)),
    };
  }
}
