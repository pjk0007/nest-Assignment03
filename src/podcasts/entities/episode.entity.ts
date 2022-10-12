import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType({isAbstract:true})
@ObjectType()
export class Episode {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  title: string;

  @Field(()=>String)
  category:string;

  @Field(()=>Number)
  rating:number;
}
