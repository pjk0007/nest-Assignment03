import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {IsString} from 'class-validator'

@InputType({isAbstract:true})
@ObjectType()
@Entity()
export class Episode extends CoreEntity{

  @Field(() => String)
  @Column()
  @IsString()
  title: string;

  @Field(()=>String)
  @Column()
  @IsString()
  category:string;

  @ManyToOne(()=>Podcast, (podcast)=>podcast.episodes)
  @JoinColumn()
  podcast:Podcast;

  update({ title, category }:{ title?:string, category?:string}) {
    if(title) this.title = title;
    if(category) this.category = category;
  }
}
