import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  birthDate: string;

  @Column({ default: 0 })
  money: number;

  @Column({ default: 100 })
  energy: number;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
