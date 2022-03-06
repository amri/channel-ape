import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { RenderService } from '../render/render.service';
import { RenderModule } from '../render/render.module';

@Module({
  imports: [RenderModule],
  providers: [NotificationService, RenderService],
  controllers: [NotificationController],
})
export class NotificationModule {}
