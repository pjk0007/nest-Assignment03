import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { PodcastsModule } from './podcasts/podcasts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { CommonModule } from './common/common.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => {
        return { token: req.headers['x-jwt'] };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      logging: true,
      synchronize: true,
      entities: [Podcast, Episode, User],
    }),
    PodcastsModule,
    UsersModule,
    AuthModule,
    JwtModule.forRoot({
      privateKey: 'I_LOVE_NICO',
    }),
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
