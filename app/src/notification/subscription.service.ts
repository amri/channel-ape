import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  getSubscribedChannels(userId: number, companyId: number): string[] {
    return ['email-channel', 'ui-channel'];
  }
}
