import { prop } from '@typegoose/typegoose';

export class Notification {
  @prop({ required: true })
  content: string;

  @prop()
  timestamp: string;
}
