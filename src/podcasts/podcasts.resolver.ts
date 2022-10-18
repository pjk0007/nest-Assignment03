import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import {
  CreateEpisodeInput,
  UpdateEpisodeInput,
} from 'src/podcasts/dto/episode-input.dto';
import { EpisodesOutput } from 'src/podcasts/dto/episode-output.dto';
import {
  CreatePodcastInput,
  UpdatePodcastInput,
} from 'src/podcasts/dto/podcast-input.dto';
import {
  AllPodcastOutput,
  PodcastOutput,
} from 'src/podcasts/dto/podcast-output.dto';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly service: PodcastsService) {}

  @Mutation(() => CommonOutput)
  async createPodcast(
    @Args('input') createPodcastDto: CreatePodcastInput,
  ): Promise<CommonOutput> {
    return await this.service.createPodcast(createPodcastDto);
  }

  @Query(() => PodcastOutput)
  async getPodcast(@Args('id') id: number): Promise<PodcastOutput> {
    return await this.service.getPodcast(id);
  }

  @Query(() => AllPodcastOutput)
  async getAllPodcasts(): Promise<AllPodcastOutput> {
    return await this.service.getAllPodcasts();
  }

  @Mutation(() => PodcastOutput)
  async updatePodcast(
    @Args('id') id: number,
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): Promise<PodcastOutput> {
    return await this.service.updatePodcast(id, updatePodcastInput);
  }

  @Mutation(() => CommonOutput)
  async deletePodcast(@Args('id') id: number): Promise<CommonOutput> {
    return await this.service.deletePodcast(id);
  }
}

@Resolver(() => Podcast)
export class EpisodeResolver {
  constructor(private readonly service: PodcastsService) {}
  @Mutation(() => PodcastOutput)
  async createEpisode(
    @Args('id') id: number,
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): Promise<PodcastOutput> {
    return this.service.createEpisode(id, createEpisodeInput);
  }

  @Query(() => EpisodesOutput)
  async getEpisodes(@Args('id') id: number): Promise<EpisodesOutput> {
    return await this.service.getEpisodes(id);
  }

  @Mutation(() => CommonOutput)
  async deleteEpisode(
    @Args('id') id: number,
    @Args('episodeId') episodeId: number,
  ): Promise<CommonOutput> {
    return await this.service.removeEpisode(id, episodeId);
  }

  @Mutation(() => EpisodesOutput)
  async updateEpisode(
    @Args('id') id: number,
    @Args('episodeId') episodeId: number,
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<EpisodesOutput> {
    return await this.service.updateEpisode(id, episodeId, updateEpisodeInput);
  }
}
