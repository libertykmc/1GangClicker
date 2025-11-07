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
  fullName: string; // ФИО

  @Column()
  birthDate: string; // дата рождения в формате дд.мм.гггг

  @Column({ default: 0 })
  money: number;

  @Column({ default: 100 })
  energy: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // дата создания аккаунта
}
