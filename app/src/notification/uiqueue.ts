import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Notification } from './dtos/notification.model';

@Injectable({ scope: Scope.DEFAULT })
export class Uiqueue {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: ReturnModelType<typeof Notification>,
  ) {}

  async append(content: string) {
    const newNotification = new this.notificationModel({
      content: content,
      timestamp: Date.now().toLocaleString(),
    });
    await newNotification.save();
  }

  async getAll() {
    const notifications = await this.notificationModel.find().exec();
    return notifications;
  }
}
