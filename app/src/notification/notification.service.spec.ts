import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { CreateNotificationCommand } from './dtos/createNotificationCommand';
import exp from 'constants';
import { RenderService } from '../render/render.service';
import {EmailChannel} from "./channels/emailChannel";
import {Channel} from "./channels/channel";

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService, RenderService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // given a request to create notification, it should return the acknowledgement message
  it('given any notification, it should return acknowledgement message', () => {
    const createNotificationCommand = new CreateNotificationCommand(
      'test',
      'Someone',
      {
        firstName: 'Amri',
        companyName: 'NESTJS',
      },
    );
    const result = service.postNotification(createNotificationCommand);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result.length).toBeGreaterThan(1);
  });

  it('given a notification, it should return acknowledgement message', () => {
    const createNotificationCommand: CreateNotificationCommand =
      new CreateNotificationCommand('happy-birthday', 'Amri', {
        firstName: 'Amri',
        companyName: 'NESTJS',
      });
    const result = service.postNotification(createNotificationCommand);
    expect(result.length).toBeGreaterThan(1);
    expect(result).toContain('Amri');
  });

  it('given a notification, it should return rendered message', () => {
    const createNotificationCommand: CreateNotificationCommand =
      new CreateNotificationCommand('happy-birthday', 'Amri', {
        firstName: 'Amri',
        companyName: 'NESTJS',
      });
    const result = service.postNotification(createNotificationCommand);
    expect(result.length).toBeGreaterThan(1);
    expect(result).toContain('Amri');
    expect(result).toContain('Happy Birthday');
  });
});
