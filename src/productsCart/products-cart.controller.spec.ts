import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCartController } from './products-cart.controller';
import { ProductsCartService } from './products-cart.service';

describe('ProductsCartController', () => {
  let controller: ProductsCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsCartController],
      providers: [ProductsCartService],
    }).compile();

    controller = module.get<ProductsCartController>(ProductsCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
