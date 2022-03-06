import { Test, TestingModule } from '@nestjs/testing';
import { RenderService } from './render.service';
import {EmailChannel} from "../notification/channels/emailChannel";
import {Channel} from "../notification/channels/channel";

describe('RenderService', () => {
  let service: RenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenderService],
    }).compile();

    service = module.get<RenderService>(RenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('given a template, it should render template', () => {
    const payload = { firstName: 'Amri' };
    const template = 'Happy Birthday {{=it.firstName}}';
    expect(service.render(payload, template)).toContain('Happy');
  });

  it('given a template and a payload, it should render template with payload', () => {
    const firstName = 'Amri';
    const payload = { firstName: firstName };
    const template = 'Happy Birthday {{=it.firstName}}';
    const result = service.render(payload, template);
    expect(result).toContain(template.substring(0, 6));
    expect(result).toContain(payload.firstName);
  });
});
