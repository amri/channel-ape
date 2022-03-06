export class CreateNotificationCommand {
  constructor(
    public notificationType: string,
    public firstName: string,
    public payload: any,
  ) {}
}
