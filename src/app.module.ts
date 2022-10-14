import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { PodcastsModule } from './podcasts/podcasts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    },),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      logging: true,
      synchronize: true,
      entities: [Podcast, Episode],
    }),
    PodcastsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
