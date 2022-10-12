import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';

@ObjectType()
export class PodcastOutput extends CommonOutput {
  @Field(()=>Podcast, {nullable:true})
  podcast?: Podcast;
}

@ObjectType()
export class AllPodcastOutput extends CommonOutput {
  @Field(()=>[Podcast], {nullable:true})
  podcasts?: Podcast[];
}

@ObjectType()
export class EpisodesOutput extends CommonOutput{
  @Field(()=>[Episode], {nullable:true})
  episodes?:Episode[];
}