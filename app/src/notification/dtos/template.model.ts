import { prop } from '@typegoose/typegoose';
import { Template } from './template';

export class TemplateModel {
  @prop({ required: true })
  notificationType: string;

  @prop()
  channelType: string;

  @prop()
  templates: Template[];
}