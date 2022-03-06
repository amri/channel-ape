import { Injectable } from '@nestjs/common';
import { CreateNotificationCommand } from './dtos/createNotificationCommand';
import { RenderService } from '../render/render.service';
import { ChannelFactory } from './channels/channelFactory';
import { Channel } from './channels/channel';
import { SendNotificationDto } from './dtos/sendNotificationDto';
import { UserService } from './user.service';
import { SubscriptionService } from './subscription.service';
import { InjectModel } from 'nestjs-typegoose';
import { Template } from './dtos/template';
import { TemplateModel } from './template.model';
import { ReturnModelType } from '@typegoose/typegoose';
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
  ) {}

  getHello() {
    // seeding ...
    // const createTemplate: TemplateModel = new TemplateModel();
    // createTemplate.notificationType = 'happy-birthday';
    // createTemplate.channelType = 'ui-channel';
    // createTemplate.templates = [
    //   new Template('content', 'Happy Birthday {{=it.firstName}}'),
    // ];
    // const newTemplate = new this.templateModel(createTemplate);
    // await newTemplate.save();
    return '';
  }

  async postNotification(sendNotificationDto: SendNotificationDto) {
    const payload = this.userService.getUser(
      sendNotificationDto.userId,
      sendNotificationDto.companyId,
    );
    const createNotificationCommand = new CreateNotificationCommand(
      sendNotificationDto.notificationType,
      payload,
    );
    const notificationType = createNotificationCommand.notificationType;

    //get subscribed channels for user
    const subscribedChannels = this.subscriptionService.getSubscribedChannels(
      sendNotificationDto.userId,
      sendNotificationDto.companyId,
    );

    let allContents = '';
    for (const channelTypeIndex in subscribedChannels) {
      this.channel = ChannelFactory.createChannelInstance(
        subscribedChannels[channelTypeIndex],
        this.renderService,
      );

      // notificationType: createNotificationCommand.notificationType,
      //     channelType: subscribedChannels[channelTypeIndex],
      const notificationChannelTemplate = await this.templateModel
        .findOne({
          $and: [
            { notificationType: createNotificationCommand.notificationType },
            { channelType: subscribedChannels[channelTypeIndex] },
          ],
        })
        .exec();
      for (const notificationChannelTemplateKey in notificationChannelTemplate.templates) {
        this.channel.addTemplate(
          notificationChannelTemplate.templates[notificationChannelTemplateKey],
        );
      }
      this.channel.setContents(createNotificationCommand.payload); //templates : [{name:"a",content:"content {{1}} {{2}} "}] payload: { 1: "", 2: "" }
      allContents = allContents + this.channel.process();
    }
    //get channels from templates

    return `Sending ${notificationType}, with message: "${allContents}"`;
  }
}
