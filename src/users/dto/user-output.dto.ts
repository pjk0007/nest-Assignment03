import { Field, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class UserOutput extends CommonOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class LoginOutput extends CommonOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
