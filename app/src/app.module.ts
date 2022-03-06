import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { RenderService } from './render/render.service';
import { RenderModule } from './render/render.module';

@Module({
  imports: [NotificationModule, RenderModule],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationService, RenderService],
})
export class AppModule {}
