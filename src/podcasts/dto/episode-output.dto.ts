import { Field, ObjectType } from "@nestjs/graphql";
import { CommonOutput } from "src/common/dto/common-output.dto";
import { Episode } from "src/podcasts/entities/episode.entity";

@ObjectType()
export class EpisodesOutput extends CommonOutput{
  @Field(()=>[Episode], {nullable:true})
  episodes?:Episode[];
}