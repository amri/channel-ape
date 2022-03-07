import { Channel } from './channel';

export class NullChannel extends Channel {
  process(): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve('');
    });
  }
}
