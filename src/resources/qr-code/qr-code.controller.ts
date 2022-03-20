
import { Controller, Get, Req, Response } from '@nestjs/common';
import express from 'express';
import createHttpError from 'http-errors';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { ShopService } from '../shops/shops.service';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
    constructor(
        private readonly qrCodeService: QrCodeService,
        private readonly shopService: ShopService
    ) { }

    @Get('generate')
    @Authentication('seller')
    async generate(@Req() { session }: RequestWithSession, @Response() res: express.Response) {
        const shop = await this.shopService.findOne({
            where: {
                owner: { id: session.id }
            }
        });
        if (!shop) throw new createHttpError.Unauthorized();
        const value = JSON.stringify({
            id: shop.id,
            identify: shop.identify,
            name: shop.name,
            logo_url: '',
            generate: new Date().toISOString()
        });
        const buff = await this.qrCodeService.generate(value);
        res.header('Content-Disposition', 'attachment; filename="qr.png"');
        res.send(buff);
    }
}
