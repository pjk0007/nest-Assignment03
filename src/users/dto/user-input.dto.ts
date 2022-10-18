import {
  InputType,
  Int,
  Field,
  PickType,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'userId',
  'email',
  'password',
  'role',
]) {}

@InputType()
export class LoginInput extends PickType(User, ['userId', 'password']) {}

@InputType()
export class EditProfileInput extends PartialType(CreateAccountInput) {}
