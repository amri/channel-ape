import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dtos/sendNotificationDto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('notification')
  @ApiOperation({
    summary: 'Sending notification',
    description:
      'Given a user ID and company ID passed, it will retrieved user/company info and prepare the notifications based on the channels (i.e., Email, UI, etc). Possible notification types: happy-birthday, leave-balance-reminder, monthly-payslip.',
  })
  sendNotification(@Body() sendNotificationRequestDto: SendNotificationDto) {
    return this.notificationService.postNotification(
      sendNotificationRequestDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve UI notifications',
    description:
      'Given a UI notifications have been submitted, this endpoint would return a list of UI notifications that have just been submitted',
  })
  getUINotifications() {
    return this.notificationService.getNotifications();
  }
}
