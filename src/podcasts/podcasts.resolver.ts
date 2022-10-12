import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import {
  CreateEpisodeInput,
  CreatePodcastInput,
  UpdateEpisodeInput,
  UpdatePodcastInput,
} from 'src/podcasts/dto/podcast-input.dto';
import {
  AllPodcastOutput,
  EpisodesOutput,
  PodcastOutput,
} from 'src/podcasts/dto/podcast-output.dto';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly service: PodcastsService) {}

  @Mutation(() => CommonOutput)
  createPodcast(
    @Args('input') createPodcastDto: CreatePodcastInput,
  ): CommonOutput {
    return this.service.createPodcast(createPodcastDto);
  }

  @Query(() => PodcastOutput)
  getPodcast(@Args('id') id: number): PodcastOutput {
    return this.service.getAllPodcast(id);
  }

  @Query(() => AllPodcastOutput)
  getAllPodcasts(): AllPodcastOutput {
    return this.service.getAllPodcasts();
  }

  @Mutation(() => PodcastOutput)
  updatePodcast(
    @Args('id') id: number,
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): PodcastOutput {
    return this.service.updatePodcast(id, updatePodcastInput);
  }

  @Mutation(() => CommonOutput)
  deletePodcast(@Args('id') id: number): CommonOutput {
    return this.service.deletePodcast(id);
  }

  @Mutation(() => CommonOutput)
  createEpisode(
    @Args('id') id: number,
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ) {
    return this.service.createEpisode(id, createEpisodeInput);
  }

  @Query(() => EpisodesOutput)
  getEpisodes(@Args('id') id: number): EpisodesOutput {
    return this.service.getEpisodes(id);
  }

  @Mutation(() => CommonOutput)
  deleteEpisode(
    @Args('id') id: number,
    @Args('episodeId') episodeId: number,
  ): CommonOutput {
    return this.service.removeEpisode(id, episodeId);
  }

  @Mutation(() => EpisodesOutput)
  updateEpisode(
    @Args('id') id: number,
    @Args('episodeId') episodeId: number,
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ) :EpisodesOutput{
    return this.service.updateEpisode(id, episodeId,updateEpisodeInput)
  }
}
