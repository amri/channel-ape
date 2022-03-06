import { Injectable } from '@nestjs/common';
import { CreateNotificationCommand } from './dtos/createNotificationCommand';
import { RenderService } from '../render/render.service';

@Injectable()
export class NotificationService {
  constructor(private readonly renderService: RenderService) {}

  getHello() {
    return '';
  }

  postNotification(createNotificationCommand: CreateNotificationCommand) {
    const notificationType = createNotificationCommand.notificationType;
    const firstName = createNotificationCommand.firstName;
    const content = this.renderService.render(
      createNotificationCommand,
      'Happy Birthday {{=it.firstName}}',
    );
    return `Sending ${notificationType}, with message: "${content}"`;
  }
}
