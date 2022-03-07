import { Channel } from './channel';

export class EmailChannel extends Channel {
  process(): Promise<string> {
    console.log('Preparing Email template');
    console.log(`Setting subject to : ${this.contents.get('subject')}`);
    console.log(`Setting content to : ${this.contents.get('content')}`);
    console.log('Email sent');
    return new Promise<string>((resolve) => {
      resolve(this.getContents());
    });
  }
}
