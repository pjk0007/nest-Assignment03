import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from 'src/jwt/jwt.interfaces';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(id: number): string {
    return jwt.sign({ id }, this.options.privateKey);
  }
  verify(token: string):string | jwt.JwtPayload {
    return jwt.verify(token, this.options.privateKey);
  }
}
