import { Channel } from './channel';
import { RenderService } from '../../render/render.service';
import { Uiqueue } from '../uiqueue';
import { ReturnModelType } from '@typegoose/typegoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UiChannel extends Channel {
  private readonly uiQueue: Uiqueue;

  constructor(uiQueue: Uiqueue, renderService: RenderService) {
    super(renderService);
    this.uiQueue = uiQueue;
  }
  async process(): Promise<string> {
    await this.uiQueue.append(this.contents.get('content'));
    return this.getContents();
  }
}
