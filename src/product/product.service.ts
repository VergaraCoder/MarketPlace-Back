import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private ProductRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto | Partial<Product>): Promise<Product> {
    try {
      const createproduct: Product = this.ProductRepository.create(createProductDto);
      await this.ProductRepository.save(createproduct);
      return createproduct;
    } catch (err: any) {
      console.log(err);

      throw err;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const product: Product[] = await this.ProductRepository.find();
      if (product.length == 0) {
        throw new ManageError({
          type: "NOT_FOUND",
          message: "DOES THERE ARE NOT product METHODS"
        });
      }
      return product;
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product: Product = await this.ProductRepository.findOneBy({ id: id });
      if (!product) {
        throw new ManageError({
          type: "NOT_FOUND",
          message: "THIS product METHOD DONT EXIST"
        });
      }
      return product;
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }


  async findOneProductByName(name: string): Promise<Product> {
    try {
      const product = await this.ProductRepository.createQueryBuilder("products").where("products.name=:prodName",{prodName:name}).orderBy("products.price", "ASC").getOne();
      if (!product) {
        throw new ManageError({
          type: "NOT_FOUND",
          message: "DONT PRODUCTS YET"
        });
      }
      return product;
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<string> {
    try {
      const { affected }: number | any = await this.ProductRepository.update(id, updateProductDto);
      if (affected == 0) {
        throw new ManageError({
          type: "NOT_FOUND",
          message: "THIS product METHOD DONT EXIST"
        });
      }
      return "melo";
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const { affected }: number | any = await this.ProductRepository.delete(id);
      if (affected == 0) {
        throw new ManageError({
          type: "NOT_FOUND",
          message: "THIS product METHOD DONT EXIST"
        });
      }
      return "melo";
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }
}
