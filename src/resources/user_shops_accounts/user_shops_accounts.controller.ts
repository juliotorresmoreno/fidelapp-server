import { Controller } from '@nestjs/common';
import { UserShopsAccountsService } from './user_shops_accounts.service';

@Controller('user-shops-accounts')
export class UserShopsAccountsController {
  constructor(private readonly userShopsAccountsService: UserShopsAccountsService) {}
}
