import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

