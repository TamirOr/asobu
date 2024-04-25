import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneToken: string;

  @OneToMany(() => EventEntity, (event) => event.creator, { cascade: true })
  createdEvents: EventEntity[];

  @OneToMany(() => EventEntity, (event) => event.guests, { cascade: true })
  invitedEvents: EventEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
