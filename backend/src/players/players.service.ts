import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { User } from '../auth/entities/user.entity';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepo: Repository<Player>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private eventsGateway: EventsGateway,
  ) { }

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
      energy: 1000,
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
    const saved = await this.playerRepo.save(player);
    this.eventsGateway.notifyUserUpdate(userId, saved);
    return saved;
  }

  async unlockAchievement(userId: string, achievementId: string) {
    const player = await this.getPlayer(userId);
    if (!player.unlockedAchievements) {
      player.unlockedAchievements = [];
    }
    if (!player.unlockedAchievements.includes(achievementId)) {
      player.unlockedAchievements.push(achievementId);
      const saved = await this.playerRepo.save(player);
      this.eventsGateway.notifyUserUpdate(userId, saved);
      return saved;
    }
    return player;
  }

  async updateSkin(userId: string, skinId: string) {
    const player = await this.getPlayer(userId);
    player.selectedSkin = skinId;
    const saved = await this.playerRepo.save(player);
    this.eventsGateway.notifyUserUpdate(userId, saved);
    return saved;
  }
}
