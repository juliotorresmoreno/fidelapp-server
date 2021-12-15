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
  Response
} from '@nestjs/common';
import { ShopService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { createSchema, updateSchema } from './joiSchema';
import { Roles } from 'src/types/roles';
import express from 'express';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Post()
  @Authentication(Roles.GESTOR)
  @UsePipes(new JoiValidationPipe(createSchema))
  create(@Request() { session }: RequestWithSession, @Body() createShopDto: CreateShopDto) {
    return this.shopService.create(session, createShopDto);
  }

  @Get()
  @Authentication(Roles.GESTOR)
  async findAll(@Request() { session }: RequestWithSession, @Response() res: express.Response) {
    this.shopService.findAll(session, {
      select: ['id', 'name', 'description', 'creation_at', 'updated_at']
    }).then((data) => {
      res
        .setHeader('Content-Range', 'shops 0-2/2')
        .setHeader('Access-Control-Expose-Headers', 'Content-Range')
        .json(data)
    });
  }

  @Get(':id')
  @Authentication(Roles.GESTOR)
  findOne(@Request() { session }: RequestWithSession, @Param('id') id: string) {
    return this.shopService.findOne(session, +id);
  }

  @Patch(':id')
  @Authentication(Roles.GESTOR)
  @UsePipes(new JoiValidationPipe(updateSchema))
  update(@Request() { session }: RequestWithSession, @Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(session, +id, updateShopDto);
  }

  @Delete(':id')
  @Authentication(Roles.GESTOR)
  remove(@Request() { session }: RequestWithSession, @Param('id') id: string) {
    return this.shopService.remove(session, +id);
  }
}
