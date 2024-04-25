import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { EventEntity } from './entities/event.entity';
import { PushNotificationService } from './services/push-notification.service';
import { EventConverter } from './converters/event.converter';
import { GuestEntity } from './entities/guest.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [UserEntity, EventEntity, GuestEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([EventEntity]),
  ],
  controllers: [EventController],
  providers: [EventService, PushNotificationService, EventConverter],
})
export class EventModule {}
