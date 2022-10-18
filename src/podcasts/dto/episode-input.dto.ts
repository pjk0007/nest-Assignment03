import { InputType, PartialType, PickType } from "@nestjs/graphql";
import { Episode } from "src/podcasts/entities/episode.entity";

@InputType()
export class CreateEpisodeInput extends PickType(Episode, [
  'title',
  'category',
]) {}

@InputType()
export class UpdateEpisodeInput extends PartialType(CreateEpisodeInput) {}
