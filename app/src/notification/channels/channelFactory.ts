import { RenderService } from '../../render/render.service';
import { EmailChannel } from './emailChannel';
import { Channel } from './channel';

export class ChannelFactory {
  static createChannelInstance(
    notificationType: string,
    renderService: RenderService,
  ): Channel {
    switch (notificationType) {
      case 'email-channel':
        return new EmailChannel(renderService);
      default:
        return new EmailChannel(renderService);
    }
  }
}
