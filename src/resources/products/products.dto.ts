
export class CreateProductDto {
    sku: string;
    name: string;
    description: string;
    shop_id: number;
}

export class UpdateProductDto {
    sku: string;
    name: string;
    description: string;
}
