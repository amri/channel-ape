import { Injectable } from '@nestjs/common';

export class UserDto {
  constructor(public firstName: string, public companyName: string) {}
}

@Injectable()
export class UserService {
  getUser(userId: number, companyId: number): UserDto {
    return new UserDto('Amri', 'NestJS');
  }
}
