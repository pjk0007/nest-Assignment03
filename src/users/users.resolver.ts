import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  CreateAccountInput,
  EditProfileInput,
  LoginInput,
} from './dto/user-input.dto';
import { LoginOutput } from './dto/user-output.dto';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CommonOutput)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ): Promise<CommonOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  login(@Args('loginInput') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => CommonOutput)
  editProfile(
    @AuthUser() user: User,
    @Args('editProfileInput') editProfileInput: EditProfileInput,
  ): Promise<CommonOutput> {
    return this.usersService.editProfile(user.id, editProfileInput);
  }

  @Query(() => User)
  seeProfile(@AuthUser() user: User): User {
    return user;
  }
}
