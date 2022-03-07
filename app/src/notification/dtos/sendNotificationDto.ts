import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty()
  public companyId: number;

  @ApiProperty()
  public userId: number;

  @ApiProperty()
  public notificationType: string;

  constructor(notificationType: string, companyId: number, userId?: number) {
    this.notificationType = notificationType;
    this.userId = userId;
    this.companyId = companyId;
  }
}
