
import { PartialType } from '@nestjs/swagger';

export class CreateShopDto {
    identify: string;
    name: string;
    description: string;
}

export class UpdateShopDto extends PartialType(CreateShopDto) {
    name: string;
    description: string;
}

export class FindAllQueryParams {
    take: string;
    skip: string;
}