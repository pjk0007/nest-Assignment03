import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { LoginOutput, UserOutput } from 'src/users/dto/user-output.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  EditProfileInput,
  LoginInput,
} from './dto/user-input.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async findById(id: number): Promise<UserOutput> {
    try {
      const user = await this.users.findOneOrFail({ where: { id } });
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async createAccount({
    userId,
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CommonOutput> {
    try {
      const userIdExists = await this.users.findOne({
        where: { userId },
      });
      if (userIdExists) {
        return { ok: false, error: 'There is a user with that id already' };
      }
      const emailExists = await this.users.findOne({
        where: { email },
      });
      if (emailExists) {
        return { ok: false, error: 'There is a user with that email already' };
      }

      await this.users.save(
        this.users.create({ userId, email, password, role }),
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Can't create account" };
    }
  }

  async login({ userId, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({
        where: { userId },
        select: ['id', 'password'],
      });
      if (!user) return { ok: false, error: 'User not found' };

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) return { ok: false, error: 'Wrong password' };

      const token = this.jwtService.sign(user.id);
      return { ok: true, token };
    } catch (error) {
      return { ok: false, error: "Can't login" };
    }
  }

  async editProfile(
    id: number,
    { userId, email, password }: EditProfileInput,
  ): Promise<CommonOutput> {
    try {
      const user = await this.users.findOne({ where: { id } });

      if (userId) {
        const countedUserId = await this.users.count({ where: { userId } });
        if (countedUserId) {
          return {
            ok: false,
            error: 'There is a user with that userId already',
          };
        }
        user.userId = userId;
      }

      if (email) {
        const countedEmail = await this.users.count({ where: { email } });
        if (countedEmail) {
          return {
            ok: false,
            error: 'There is a user with that email already',
          };
        }
        user.email = email;
      }

      if (password) user.password = password;

      await this.users.save(user);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Can't edit profile" };
    }
  }
}
