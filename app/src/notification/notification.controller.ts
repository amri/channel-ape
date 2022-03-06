import {Body, Controller, Get, Post} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {SendNotificationDto} from "./dtos/sendNotificationDto";

@Controller('api/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getHello(): Promise<string> {
    const result = await this.notificationService.getHello();
    return result;
  }

  @Post()
  sendNotification(@Body() sendNotificationRequestDto: SendNotificationDto) {
    return this.notificationService.postNotification(sendNotificationRequestDto);
  }
}
