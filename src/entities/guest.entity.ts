import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { EventEntity } from './event.entity';
import { UserEntity } from './user.entity';

@Entity('guest')
export class GuestEntity {
  @PrimaryColumn('uuid')
  eventId: string;

  @PrimaryColumn('uuid')
  userId: string;

  @ManyToOne(() => EventEntity, (event) => event.guests)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  response: boolean;
}
