import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { RenderService } from './render/render.service';
import { RenderModule } from './render/render.module';
import { SubscriptionService } from './notification/subscription.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { TemplateModel } from './notification/dtos/template.model';
import { Uiqueue } from './notification/uiqueue';
import { UserService } from './notification/user.service';
import { Notification } from './notification/dtos/notification.model';

@Module({
  imports: [
    NotificationModule,
    RenderModule,
    TypegooseModule.forRoot('mongodb://mongodb:27017/nest', {}),
    TypegooseModule.forFeature([TemplateModel]),
    TypegooseModule.forFeature([Notification]),
  ],
  controllers: [AppController, NotificationController],
  providers: [
    AppService,
    NotificationService,
    RenderService,
    SubscriptionService,
    Uiqueue,
    UserService,
  ],
})
export class AppModule {}
