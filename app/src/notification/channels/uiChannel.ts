import { Channel } from './channel';

export class UiChannel extends Channel {
  process(): string {
    console.log('Preparing UI notification');
    console.log(`Setting content to : ${this.contents.get('content')}`);
    console.log('UI notification sent');
    return this.getContents();
  }
}
