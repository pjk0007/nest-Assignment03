import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver } from './podcasts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { Episode } from 'src/podcasts/entities/episode.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Podcast, Episode])],
  providers: [PodcastsResolver, PodcastsService]
})
export class PodcastsModule {}
