import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { Player } from './players/entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: '1Gang',
      entities: [User, Player],
      synchronize: true,
    }),
    AuthModule,
    PlayersModule,
  ],
})
export class AppModule {}
