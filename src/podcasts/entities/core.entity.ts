import { Field, ObjectType } from "@nestjs/graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class CoreEntity {
  @Field((_) => Number)
  @Column()
  @PrimaryGeneratedColumn()
  id: number;
}
