import {
    UsePipes,
    Get, Post, Patch, Delete,
    Param, Body, Query,
    Controller, Request, Response
} from '@nestjs/common';
import createHttpError from 'http-errors';
import getConfig from 'src/config/configuration';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { RequestWithSession } from 'src/types/http';
import { paginator } from 'src/utils/paginator';
import { Authentication } from 'src/utils/secure';
import { FindAllQueryParams } from '../shops/shops.dto';
import { ShopService } from '../shops/shops.service';
import { createProductSchema, updateProductSchema } from './joiSchema';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { ProductsService } from './products.service';
import express from 'express';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly shopService: ShopService
    ) { }

    @Post()
    @UsePipes(new JoiValidationPipe(createProductSchema))
    @Authentication('seller')
    async create(@Request() { session }: RequestWithSession, @Body() payload: CreateProductDto) {
        const shop = await this.shopService.findOne({
            where: {
                id: payload.shop_id,
                owner: session
            }
        });
        if (!shop) throw new createHttpError.Unauthorized();

        return this.productsService.create({
            ...payload,
            owner: session
        });
    }

    @Get()
    async findAll(
        @Request() { session }: RequestWithSession,
        @Response() res: express.Response,
        @Query() query: FindAllQueryParams
    ) {
        const config = getConfig();
        const skip = Number.parseInt(query.skip || '0');
        const take = Number.parseInt(query.take || '0') || config.pageSize;

        this.productsService.findAll({
            relations: ['owner', 'shop'],
            where: {
                owner: { id: session.id },
                deleted_at: null
            },
            take, skip
        }).then(paginator(res, 'products', skip, take));
    }

    @Get(':id')
    findOne(@Request() { session }: RequestWithSession, @Param('id') id: string) {
        return this.productsService.findOne({
            where: {
                id: Number.parseInt(id),
                owner: { id: session.id },
                deleted_at: null
            }
        });
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe(updateProductSchema))
    @Authentication('seller')
    update(@Request() { session }: RequestWithSession, @Param('id') id: string, @Body() payload: UpdateProductDto) {
        return this.productsService.update({
            id: Number.parseInt(id),
            owner: { id: session.id },
            deleted_at: null
        }, payload);
    }

    @Delete(':id')
    @Authentication('seller')
    remove(@Request() { session }: RequestWithSession, @Param('id') id: string) {
        return this.productsService.remove({
            id: Number.parseInt(id),
            owner: { id: session.id },
            deleted_at: null
        });
    }
}
