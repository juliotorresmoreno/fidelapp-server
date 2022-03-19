
import { Controller, Get, Param, Req, UnauthorizedException } from '@nestjs/common';
import getConfig from 'src/config/configuration';
import { RequestWithSession } from 'src/types/http';
import { Roles } from 'src/types/roles';
import { Authentication } from 'src/utils/secure';
import { ShopService } from '../shops/shops.service';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(
    private readonly qrCodeService: QrCodeService,
    private readonly shopService: ShopService
  ) { }

  @Get('generate/:shopId')
  @Authentication('seller')
  async generate(@Req() { session }: RequestWithSession, @Param('shopId') shopId: string) {
    const shop = await this.shopService.findOne(session, +shopId);
    if (!shop) throw new UnauthorizedException();
    const config = getConfig();

    return { url: `${config.baseUrl}/shops/${shop.id}` };
  }
}
