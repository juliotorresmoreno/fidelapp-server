

export class RegisterShopDto {
    shop_id: number;
}

export class AddBalanceShopDto {
    shop_id: number;
    balance: number;
    client_id: number;
}

export class BuyOnShopDto {
    shop_id: number;
    product_id: number;
    quantity: number;
}

