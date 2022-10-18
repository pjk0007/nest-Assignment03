import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { IsString, IsNumber, Min, Max } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  title: string;

  @Field(() => String)
  @Column()
  @IsString()
  category: string;

  @Field(() => Number, { defaultValue: 0 })
  @Column({ default: 0 })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Field(() => [Episode], { defaultValue: [] })
  @OneToMany(() => Episode, (episode) => episode.podcast)
  @JoinColumn()
  episodes: Episode[];

  update({
    title,
    category,
    rating,
  }: {
    title?: string;
    category?: string;
    rating?: number;
  }) {
    if (title) this.title = title;
    if (category) this.category = category;
    if (rating) this.rating = rating;
  }
}
