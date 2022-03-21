import express from 'express';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UsePipes,
    Response,
    Query
} from '@nestjs/common';
import { ShopService } from './shops.service';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { createShopSchema, updateShopSchema } from './joiSchema';
import { CreateShopDto, FindAllQueryParams, UpdateShopDto } from './shops.dto';
import getConfig from 'src/config/configuration';
import { paginator } from 'src/utils/paginator';

@Controller('shops')
export class ShopController {
    fieldSelect: any[] = ['id', 'identify', 'name', 'description', 'creation_at', 'updated_at'];

    constructor(private readonly shopService: ShopService) { }

    @Post()
    @UsePipes(new JoiValidationPipe(createShopSchema))
    @Authentication('seller')
    create(@Request() { session }: RequestWithSession, @Body() createShopDto: CreateShopDto) {
        const identify = createShopDto.identify.replace(/\s+/g, '').toLowerCase();
        return this.shopService.create({
            ...createShopDto,
            identify: identify,
            owner: session
        });
    }

    @Get()
    @Authentication('seller')
    async findAll(
        @Request() { session }: RequestWithSession,
        @Response() res: express.Response,
        @Query() query: FindAllQueryParams
    ) {
        const config = getConfig();
        const skip = Number.parseInt(query.skip || '0');
        const take = Number.parseInt(query.take || '0') || config.pageSize;

        this.shopService.findAll({
            relations: ['owner'],
            select: this.fieldSelect,
            where: {
                owner: { id: session.id },
                deleted_at: null
            },
            take, skip
        }).then(paginator(res, 'shops', skip, take));
    }

    @Get('me')
    @Authentication('seller')
    async findMe(
        @Request() { session }: RequestWithSession,
        @Response() res: express.Response,
        @Query() query: FindAllQueryParams
    ) {
        const config = getConfig();
        const skip = Number.parseInt(query.skip || '0');
        const take = Number.parseInt(query.take || '0') || config.pageSize;

        this.shopService.findAll({
            relations: ['owner'],
            select: this.fieldSelect,
            where: {
                owner: { id: session.id },
                deleted_at: null
            },
            take, skip
        }).then(paginator(res, 'shops', skip, take));
    }

    @Get(':id')
    @Authentication('seller')
    findOne(@Request() { session }: RequestWithSession, @Param('id') id: string) {
        return this.shopService.findOne({
            where: {
                id: Number.parseInt(id),
                owner: { id: session.id },
                deleted_at: null
            }
        });
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe(updateShopSchema))
    @Authentication('seller')
    update(@Request() { session }: RequestWithSession, @Param('id') id: string, @Body() payload: UpdateShopDto) {
        return this.shopService.update({
            id: Number.parseInt(id),
            owner: { id: session.id },
            deleted_at: null
        }, payload);
    }

    @Delete(':id')
    @Authentication('seller')
    remove(@Request() { session }: RequestWithSession, @Param('id') id: string) {
        return this.shopService.remove({
            id: Number.parseInt(id),
            owner: { id: session.id },
            deleted_at: null
        });
    }
}
