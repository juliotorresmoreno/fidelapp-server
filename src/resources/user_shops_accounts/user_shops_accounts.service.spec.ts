import { Test, TestingModule } from '@nestjs/testing';
import { UserShopsAccountsService } from './user_shops_accounts.service';

describe('UserShopsAccountsService', () => {
  let service: UserShopsAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserShopsAccountsService],
    }).compile();

    service = module.get<UserShopsAccountsService>(UserShopsAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
