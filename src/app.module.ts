import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { StoriesModule } from './stories/stories.module';
import { VotesModule } from './votes/votes.module';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    CardsModule,
    StoriesModule,
    VotesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
