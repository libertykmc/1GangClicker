import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { User } from '../auth/entities/user.entity';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class PlayersService {
  private readonly MAX_ENERGY = 1000;
  private readonly ENERGY_REGEN_AMOUNT = 10;
  private readonly ENERGY_REGEN_INTERVAL_MS = 2000;

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

  private applyPassiveEnergyRegen(player: Player): boolean {
    if (!player.updatedAt) return false;

    const elapsedMs = Date.now() - player.updatedAt.getTime();
    if (elapsedMs < this.ENERGY_REGEN_INTERVAL_MS) return false;

    const ticks = Math.floor(elapsedMs / this.ENERGY_REGEN_INTERVAL_MS);
    if (ticks <= 0) return false;

    const restoredEnergy = ticks * this.ENERGY_REGEN_AMOUNT;
    const nextEnergy = Math.min(this.MAX_ENERGY, player.energy + restoredEnergy);
    if (nextEnergy === player.energy) return false;

    player.energy = nextEnergy;
    return true;
  }

  private async loadPlayer(userId: string) {
    const player = await this.playerRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  async getPlayer(userId: string) {
    const player = await this.loadPlayer(userId);
    const changed = this.applyPassiveEnergyRegen(player);
    if (changed) {
      player.updatedAt = new Date();
      await this.playerRepo.save(player);
    }
    return player;
  }

  async updateStats(userId: string, deltaMoney: number, deltaEnergy: number) {
    const player = await this.loadPlayer(userId);
    if (this.applyPassiveEnergyRegen(player)) {
      player.updatedAt = new Date();
    }

    if (typeof deltaMoney === 'number') {
      player.money += deltaMoney;
    }

    if (typeof deltaEnergy === 'number') {
      const nextEnergy = player.energy + deltaEnergy;
      player.energy = Math.min(this.MAX_ENERGY, Math.max(0, nextEnergy));
    }

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
