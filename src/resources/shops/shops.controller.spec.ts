import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shops.controller';
import { ShopService } from './shops.service';

describe('ShopController', () => {
    let controller: ShopController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShopController],
            providers: [ShopService],
        }).compile();

        controller = module.get<ShopController>(ShopController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
