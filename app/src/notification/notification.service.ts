import { Injectable } from '@nestjs/common';
import { CreateNotificationCommand } from './dtos/createNotificationCommand';
import { RenderService } from '../render/render.service';
import { ChannelFactory } from './channels/channelFactory';
import { Channel } from './channels/channel';
import { SendNotificationDto } from './dtos/sendNotificationDto';
import { UserDto, UserService } from './user.service';
import { SubscriptionService } from './subscription.service';
import { InjectModel } from 'nestjs-typegoose';
import { Template } from './dtos/template';
import { TemplateModel } from './dtos/template.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Uiqueue } from './uiqueue';
// import { ChannelFactory } from './channelFactory';

@Injectable()
export class NotificationService {
  private channel: Channel;
  constructor(
    private readonly renderService: RenderService,
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService,
    @InjectModel(TemplateModel)
    private readonly templateModel: ReturnModelType<typeof TemplateModel>,
    private readonly uiQueueService: Uiqueue,
  ) {}

  getNotifications() {
    return this.uiQueueService.getAll();
  }

  async postNotification(sendNotificationDto: SendNotificationDto) {
    if (sendNotificationDto.companyId == null) {
      return `Sending ${sendNotificationDto.notificationType}, no company found"`;
    }

    let allContents = '';
    // sending as company
    if (sendNotificationDto.userId == null) {
      const userPayloads = this.userService.getUsers(
        sendNotificationDto.companyId,
      );

      for (const userPayloadsKey in userPayloads) {
        const userPayload = userPayloads[userPayloadsKey];
        allContents =
          allContents +
          (await this.processNotificationForUser(
            userPayload,
            sendNotificationDto.notificationType,
          ));
      }
    } else {
      //sending as userid & company
      const userPayload = this.userService.getUser(
        sendNotificationDto.userId,
        sendNotificationDto.companyId,
      );

      if (userPayload == null) {
        return `Sending ${sendNotificationDto.notificationType}, no user found"`;
      }

      allContents = await this.processNotificationForUser(
        userPayload,
        sendNotificationDto.notificationType,
      );
    }

    return `Sending ${sendNotificationDto.notificationType}, with message: "${allContents}"`;
  }

  private async processNotificationForUser(
    userPayload: UserDto,
    notificationType: string,
  ): Promise<string> {
    this.extractCustomPayload(userPayload);

    const createNotificationCommand = new CreateNotificationCommand(
      notificationType,
      userPayload,
    );

    // get subscribed channel
    const subscribedChannels = this.subscriptionService.getSubscribedChannels(
      userPayload.userId,
      userPayload.companyId,
    );

    if (subscribedChannels == null || subscribedChannels.length == 0) {
      return `Sending ${notificationType}, no subscriptions found"`;
    }

    //for debug purpose
    let allContents = '';
    for (const channelTypeIndex in subscribedChannels) {
      // create instance of specific channel
      this.channel = ChannelFactory.createChannelInstance(
        subscribedChannels[channelTypeIndex],
        this.renderService,
        this.uiQueueService,
      );

      try {
        // get templates from db
        const notificationChannelTemplate = await this.templateModel
          .findOne({
            $and: [
              { notificationType: createNotificationCommand.notificationType },
              { channelType: subscribedChannels[channelTypeIndex] },
            ],
          })
          .exec();

        // only process if the template has
        if (
          notificationChannelTemplate != null &&
          notificationChannelTemplate.templates != null
        ) {
          for (const notificationChannelTemplateKey in notificationChannelTemplate.templates) {
            this.channel.addTemplate(
              notificationChannelTemplate.templates[
                notificationChannelTemplateKey
              ],
            );
          }
          this.channel.setContents(createNotificationCommand.payload);
          const content = await this.channel.process();
          allContents = allContents + content + '\n';
        }
      } catch (e) {
        console.log(e);
      }
    }
    return new Promise((resolve) => {
      resolve(allContents);
    });
  }

  private extractCustomPayload(payload: UserDto) {
    const currentDate = new Date();
    payload.month = (currentDate.getMonth() + 1).toString();
    payload.year = currentDate.getFullYear().toString();
  }
}
