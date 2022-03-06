import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { RenderService } from './render/render.service';
import { RenderModule } from './render/render.module';
import { EmailChannel } from './notification/channels/emailChannel';
import { Channel } from './notification/channels/channel';
import { SubscriptionService } from './notification/subscription.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { TemplateModel } from './notification/template.model';

@Module({
  imports: [
    NotificationModule,
    RenderModule,
    TypegooseModule.forRoot('mongodb://localhost:27017/nest', {}),
    TypegooseModule.forFeature([TemplateModel]),
  ],
  controllers: [AppController, NotificationController],
  providers: [
    AppService,
    NotificationService,
    RenderService,
    SubscriptionService,
  ],
})
export class AppModule {}
