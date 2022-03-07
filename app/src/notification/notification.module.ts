import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { RenderService } from '../render/render.service';
import { RenderModule } from '../render/render.module';
import { EmailChannel } from './channels/emailChannel';
import { Channel } from './channels/channel';
import { UserService } from './user.service';
import { SubscriptionService } from './subscription.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { TemplateModel } from './dtos/template.model';
import { Uiqueue } from './uiqueue';
import {Notification} from "./dtos/notification.model";

@Module({
  imports: [RenderModule, TypegooseModule.forFeature([TemplateModel]), TypegooseModule.forFeature([Notification])],
  providers: [
    NotificationService,
    RenderService,
    UserService,
    SubscriptionService,
    Uiqueue,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
