import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';
import { ShopService } from '../shops/shops.service';

@Module({
  controllers: [QrCodeController],
  providers: [QrCodeService, ShopService]
})
export class QrCodeModule { }
