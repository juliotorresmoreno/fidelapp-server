import { Test, TestingModule } from '@nestjs/testing';
import { UserShopsAccountsController } from './user_shops_accounts.controller';
import { UserShopsAccountsService } from './user_shops_accounts.service';

describe('UserShopsAccountsController', () => {
  let controller: UserShopsAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserShopsAccountsController],
      providers: [UserShopsAccountsService],
    }).compile();

    controller = module.get<UserShopsAccountsController>(UserShopsAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
