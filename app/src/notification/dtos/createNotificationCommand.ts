export class CreateNotificationCommand {
  constructor(
    public notificationType: string,
    public payload: any,
  ) {}
}
