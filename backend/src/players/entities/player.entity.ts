import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: 0 })
  money: number;

  @Column({ default: 1000 })
  energy: number;

  @Column({ default: 1 })
  clickPower: number;

  @Column({ default: 10 })
  energyPerClick: number;

  @Column('simple-array', { default: '' })
  unlockedAchievements: string[];

  @Column({ default: 'people' })
  selectedSkin: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
