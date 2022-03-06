import { Channel } from './channel';

export class WhatsappChannel extends Channel {
  process(): string {
    console.log('Preparing Whatsapp message');
    console.log('Getting whatsapp API key');
    console.log(`Setting content to : ${this.contents.get('content')}`);
    console.log('Whatsapp sent');
    return this.getContents();
  }
}
