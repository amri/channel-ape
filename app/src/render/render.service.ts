import { Injectable } from '@nestjs/common';
const dot = require('dot/doT');

@Injectable()
export class RenderService {
  render(payload: any, template: string) {
    const tempFn = dot.template(template);
    const result = tempFn(payload);
    return result;
  }
}
