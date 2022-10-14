import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
  'title',
  'category',
]) {}

@InputType()
export class UpdatePodcastInput extends PartialType(
  PickType(Podcast, ['title', 'category', 'rating']),
) {}

@InputType()
export class CreateEpisodeInput extends PickType(Episode, [
  'title',
  'category',
]) {}

@InputType()
export class UpdateEpisodeInput extends PartialType(CreateEpisodeInput) {}
