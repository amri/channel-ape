import { Injectable } from '@nestjs/common';

export class UserDto {
  month: string;
  year: string;
  constructor(
    public firstName: string,
    public companyName: string,
    public userId: number,
    public companyId: number,
  ) {}
}

@Injectable()
export class UserService {
  getUser(userId: number, companyId: number): UserDto {
    return new UserDto('Amri', 'NestJS', 1, 1);
  }

  getUsers(companyId: number): UserDto[] {
    return [
      new UserDto('Amri', 'NestJS', 1, 1),
      new UserDto('Adam', 'NestJS', 1, 1),
      new UserDto('Noah', 'NestJS', 1, 1),
    ];
  }
}
