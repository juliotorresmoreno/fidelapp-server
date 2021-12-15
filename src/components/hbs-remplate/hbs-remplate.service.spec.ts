import { Test, TestingModule } from '@nestjs/testing';
import { HbsRemplateService } from './hbs-remplate.service';

describe('HbsRemplateService', () => {
  let service: HbsRemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HbsRemplateService],
    }).compile();

    service = module.get<HbsRemplateService>(HbsRemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
