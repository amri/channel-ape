import { RenderService } from '../../render/render.service';
import { EmailChannel } from './emailChannel';
import { Channel } from './channel';
import { UiChannel } from './uiChannel';
import { NullChannel } from './nullChannel';
import { Uiqueue } from '../uiqueue';

export class ChannelFactory {
  static createChannelInstance(
    channelType: string,
    renderService: RenderService,
    uiQueueService: Uiqueue,
  ): Channel {
    switch (channelType) {
      case 'email-channel':
        return new EmailChannel(renderService);
      case 'ui-channel':
        return new UiChannel(uiQueueService, renderService);
      default:
        return new NullChannel(renderService);
    }
  }
}
