import { Injectable } from '@nestjs/common';
import { CreateNotificationCommand } from './dtos/createNotificationCommand';
import { RenderService } from '../render/render.service';
import { ChannelFactory } from './channels/channelFactory';
import {Channel} from "./channels/channel";
// import { ChannelFactory } from './channelFactory';

@Injectable()
export class NotificationService {
  private channel: Channel;
  constructor(private readonly renderService: RenderService) {}

  getHello() {
    return '';
  }

  postNotification(createNotificationCommand: CreateNotificationCommand) {
    const notificationType = createNotificationCommand.notificationType;
    const firstName = createNotificationCommand.firstName;
    this.channel = ChannelFactory.createChannelInstance(
      notificationType,
      this.renderService,
    );
    //get template
    //add template
    this.channel.addTemplate({
      name: 'content',
      content:
        'Hi, {{=it.firstName}}, We at {{=it.companyName}} would like to wish you a happy birthday',
    });
    this.channel.addTemplate({
      name: 'subject',
      content: 'Happy Birthday {{=it.firstName}}',
    });
    this.channel.setContents(createNotificationCommand.payload); //templates : [{name:"a",content:"content {{1}} {{2}} "}] payload: { 1: "", 2: "" }
    const content = this.channel.process();
    return `Sending ${notificationType}, with message: "${content}"`;
  }
}
