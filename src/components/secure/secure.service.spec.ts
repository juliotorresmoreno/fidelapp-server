import { Test, TestingModule } from '@nestjs/testing';
import { SecureService } from './secure.service';

describe('SecureService', () => {
  let service: SecureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecureService],
    }).compile();

    service = module.get<SecureService>(SecureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
