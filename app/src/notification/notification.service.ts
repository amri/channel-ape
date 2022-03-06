import { Injectable } from '@nestjs/common';
import { CreateNotificationCommand } from './dtos/createNotificationCommand';

@Injectable()
export class NotificationService {
  getHello() {
    return '';
  }

  postNotification(createNotificationCommand: CreateNotificationCommand) {
    const notificationType = createNotificationCommand.notificationType;
    const firstName = createNotificationCommand.firstName;
    return `Sending ${notificationType} for ${firstName}`;
  }
}
