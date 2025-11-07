import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Связь 1:1 с пользователем
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: 0 })
  money: number;

  @Column({ default: 100 })
  energy: number;

  @Column({ default: 1 })
  clickPower: number; // сила клика

  @Column({ default: 10 })
  energyPerClick: number; // сколько энергии уходит за клик
}
