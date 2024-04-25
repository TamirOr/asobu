import { Controller, Post, Body, Patch, Search } from '@nestjs/common';
import { CreateEventRequest } from 'src/models/api/create-event.request.model';
import { CreateEventResponse } from 'src/models/api/create-event.response.model';
import { FindEventsRequest } from 'src/models/api/find-events.request.model';
import { FindEventsResponse } from 'src/models/api/find-events.response.model';
import { UpdateEventRequest } from 'src/models/api/update-event.request.model';
import { UpdateEventResponse } from 'src/models/api/update-event.response.model';
import { EventService } from 'src/services/event.service';

@Controller('/evnets')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(
    @Body() request: CreateEventRequest,
  ): Promise<CreateEventResponse> {
    return this.eventService.createEvent(request);
  }

  @Patch()
  updateEvent(
    @Body() request: UpdateEventRequest,
  ): Promise<UpdateEventResponse> {
    return this.eventService.updateEvent(request);
  }

  @Search('user_events/:user_id')
  findEvents(request: FindEventsRequest): Promise<FindEventsResponse> {
    return this.eventService.findEvents(request);
  }
}
