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
import { createSchema, updateSchema } from './joiSchema';
import { CreateShopDto, FindAllQueryParams, UpdateShopDto } from './shops.dto';
import getConfig from 'src/config/configuration';
import { paginator } from 'src/utils/paginator';

@Controller('shops')
export class ShopController {
    fieldSelect: any[] = ['id', 'identify', 'name', 'description', 'creation_at', 'updated_at'];

    constructor(private readonly shopService: ShopService) { }

    @Post()
    @Authentication('seller')
    @UsePipes(new JoiValidationPipe(createSchema))
    create(@Request() { session }: RequestWithSession, @Body() createShopDto: CreateShopDto) {
        return this.shopService.create(session, {
            ...createShopDto,
            identify: createShopDto.identify.toLowerCase()
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
                owner: { id: session.id }
            },
            take, skip
        }).then(paginator(res, skip, take));
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
                owner: { id: session.id }
            },
            take, skip
        }).then(paginator(res, skip, take));
    }

    @Get(':id')
    @Authentication('seller')
    findOne(@Request() { session }: RequestWithSession, @Param('id') id: string) {
        return this.shopService.findOne(session, +id);
    }

    @Patch(':id')
    @Authentication('seller')
    @UsePipes(new JoiValidationPipe(updateSchema))
    update(@Request() { session }: RequestWithSession, @Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
        return this.shopService.update(session, +id, updateShopDto);
    }

    @Delete(':id')
    @Authentication('seller')
    remove(@Request() { session }: RequestWithSession, @Param('id') id: string) {
        return this.shopService.remove(session, +id);
    }
}
