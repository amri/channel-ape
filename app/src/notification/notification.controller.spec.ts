import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { RenderService } from '../render/render.service';
import { EmailChannel } from './channels/emailChannel';
import { Channel } from './channels/channel';
import { SendNotificationDto } from './dtos/sendNotificationDto';
import { UserService } from './user.service';
import { SubscriptionService } from './subscription.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { TemplateModel } from './template.model';

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypegooseModule.forFeature([TemplateModel]),
        TypegooseModule.forRoot('mongodb://localhost:27017/nest', {}),
      ],
      controllers: [NotificationController],
      providers: [
        NotificationService,
        RenderService,
        UserService,
        SubscriptionService,
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return template', () => {
    const sendNotificationDto = new SendNotificationDto(1, 1, 'happy-birthday');
    expect(controller.sendNotification(sendNotificationDto)).resolves.toContain(
      'Amri',
    );
  });
});
