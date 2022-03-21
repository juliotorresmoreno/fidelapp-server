import { Module } from '@nestjs/common';
import { UserShopsAccountsService } from './user_shops_accounts.service';
import { UserShopsAccountsController } from './user_shops_accounts.controller';

@Module({
  controllers: [UserShopsAccountsController],
  providers: [UserShopsAccountsService]
})
export class UserShopsAccountsModule {}
