import {RenderService} from '../../render/render.service';
import {Template} from '../dtos/template';

export abstract class Channel {
  private readonly renderService: RenderService;
  protected contents: Map<string, string> = new Map<string, string>();
  protected templates: Template[] = [];

  constructor(renderService: RenderService) {
    this.renderService = renderService;
  }

  setContents(payload: any): void {
    for (let i = 0; i < this.templates.length; i++) {
      this.contents.set(
        this.templates[i].name,
        this.render(payload, this.templates[i].content),
      );
    }
  }

  render(payload: any, template: string): string {
    return this.renderService.render(payload, template);
  }

  addTemplate(template: Template): void {
    this.templates.push(template);
  }

  getContents() {
    let data = '';
    this.contents.forEach((value, key) => {
      data = data + value;
    });
    return data;
  }

  abstract process(): string;
}

