import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCartService } from './products-cart.service';

describe('ProductsCartService', () => {
  let service: ProductsCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsCartService],
    }).compile();

    service = module.get<ProductsCartService>(ProductsCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
