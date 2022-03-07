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
import { TemplateModel } from './dtos/template.model';
import { Uiqueue } from './uiqueue';
import { Notification } from './dtos/notification.model';

describe('NotificationService', () => {
  let service: NotificationService;
  let subscriptionService: SubscriptionService;
  let userService: UserService;
  const sendHappyNotifWithUserAndCompanyID = new SendNotificationDto(
    'happy-birthday',
    1,
    1,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypegooseModule.forFeature([TemplateModel]),
        TypegooseModule.forFeature([Notification]),
        TypegooseModule.forRoot('mongodb://localhost:27017/nest', {}),
      ],
      providers: [
        NotificationService,
        RenderService,
        UserService,
        SubscriptionService,
        Uiqueue,
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // given a request to create notification, it should return the acknowledgement message
  it('given any notification, it should return acknowledgement message', async () => {
    const result = await service.postNotification(sendHappyNotifWithUserAndCompanyID);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result.length).toBeGreaterThan(1);
  });

  it('given a notification, it should return acknowledgement message', async () => {
    const result = await service.postNotification(sendHappyNotifWithUserAndCompanyID);
    expect(result.length).toBeGreaterThan(1);
    expect(result).toContain('Amri');
  });

  it('given a notification, it should return rendered message', async () => {
    const createNotificationCommand = new SendNotificationDto(
      'happy-birthday',
      1,
      1,
    );
    const result = await service.postNotification(createNotificationCommand);
    expect(result.length).toBeGreaterThan(1);
    expect(result).toContain('Amri');
    expect(result).toContain('Happy Birthday');
  });

  it('given a user have no channel subscription, it should not return empty rendered message', async () => {
    jest
      .spyOn(subscriptionService, 'getSubscribedChannels')
      .mockImplementation(() => []);
    const result = await service.postNotification(sendHappyNotifWithUserAndCompanyID);
    expect(result.length).toBeGreaterThan(1);
    expect(result).not.toContain('Amri');
    expect(result).not.toContain('Happy Birthday');
  });

  it('given no user returned, it should not return empty rendered message and no user found message', async () => {
    jest.spyOn(userService, 'getUser').mockImplementation(() => null);
    const result = await service.postNotification(sendHappyNotifWithUserAndCompanyID);
    expect(result.length).toBeGreaterThan(1);
    expect(result).toContain('no user found');
    expect(result).not.toContain('Amri');
    expect(result).not.toContain('Happy Birthday');
  });

  it('given no userid sent and only companyid, it should send notification to the company users', async () => {
    const sendNotificatioWithoutUserID = new SendNotificationDto(
      'happy-birthday',
      1,
    );
    jest.setTimeout(20000);
    jest.spyOn(userService, 'getUser').mockImplementation(() => null);
    const result = await service.postNotification(sendNotificatioWithoutUserID);
    expect(result.length).toBeGreaterThan(1);
    expect(result).toContain('Amri');
    expect(result).toContain('Happy Birthday');
  });
});
