import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { GuestEntity } from './guest.entity';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.createdEvents)
  creator: UserEntity;

  @OneToMany(() => GuestEntity, (guests) => guests.event)
  guests: GuestEntity[];

  @Column()
  location: string; // Assuming location as string for simplicity

  @Column()
  timeOfEvent: Date;

  @Column()
  additionalData: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
