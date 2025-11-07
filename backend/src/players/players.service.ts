import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepo: Repository<Player>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createForUser(userId: string) {
    console.log('🔍 Поиск пользователя с id:', userId);

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      console.error('❌ Пользователь не найден');
      throw new NotFoundException('User not found');
    }

    console.log('✅ Пользователь найден:', user.username);

    const newPlayer = this.playerRepo.create({
      user,
      level: 1,
      experience: 0,
      money: 0,
      energy: 100,
      clickPower: 1,
    });

    console.log('🧩 Создаём игрока:', newPlayer);

    const saved = await this.playerRepo.save(newPlayer);
    console.log('✅ Игрок успешно создан:', saved);

    return saved;
  }

  async getPlayer(userId: string) {
    const player = await this.playerRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  async updateStats(userId: string, deltaMoney: number, _deltaEnergy: number) {
    const player = await this.getPlayer(userId);
    player.money += deltaMoney;
    return this.playerRepo.save(player);
  }
}
