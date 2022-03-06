import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { CreateNotificationCommand } from './dtos/createNotificationCommand';
import exp from 'constants';
import { RenderService } from '../render/render.service';
import { EmailChannel } from './channels/emailChannel';
import { Channel } from './channels/channel';
import { SendNotificationDto } from './dtos/sendNotificationDto';
import { UserService } from './user.service';
import { SubscriptionService } from './subscription.service';
import { RenderModule } from '../render/render.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { TemplateModel } from './template.model';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypegooseModule.forFeature([TemplateModel]),
        TypegooseModule.forRoot('mongodb://localhost:27017/nest', {}),
      ],
      providers: [
        NotificationService,
        RenderService,
        UserService,
        SubscriptionService,
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // given a request to create notification, it should return the acknowledgement message
  it('given any notification, it should return acknowledgement message', async () => {
    const createNotificationCommand = new SendNotificationDto(
      1,
      1,
      'happy-birthday',
    );
    const result = await service.postNotification(createNotificationCommand);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result.length).toBeGreaterThan(1);
  });

  it('given a notification, it should return acknowledgement message', async () => {
    const createNotificationCommand = new SendNotificationDto(
      1,
      1,
      'happy-birthday',
    );
    const result = await service.postNotification(createNotificationCommand);
    expect(result.length).toBeGreaterThan(1);
    expect(result).toContain('Amri');
  });

  it('given a notification, it should return rendered message', async () => {
    const createNotificationCommand = new SendNotificationDto(
      1,
      1,
      'happy-birthday',
    );
    const result = await service.postNotification(createNotificationCommand);
    expect(result.length).toBeGreaterThan(1);
    expect(result).toContain('Amri');
    expect(result).toContain('Happy Birthday');
  });
});
