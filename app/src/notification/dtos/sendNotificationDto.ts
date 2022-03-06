export class SendNotificationDto {
  constructor(
    public companyId: number,
    public userId: number,
    public notificationType: string,
  ) {}
}
