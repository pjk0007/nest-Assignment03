import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver } from './podcasts.resolver';

@Module({
  providers: [PodcastsResolver, PodcastsService]
})
export class PodcastsModule {}
