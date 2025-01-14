import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private readonly CategoryRepository: Repository<Category>
  ){}

  // async create(createCategoryDto: CreateCategoryDto) {
  // try{
  //       const createOpinion:Category=this.CategoryRepository.create(createCategoryDto);
  //       await this.CategoryRepository.save(createOpinion);
  //       return createOpinion;
  //     }catch(err:any){
  //       throw err;
  //     }
  // }

  async findAll():Promise<Category[]> {
    try{
      const categories:Category[]=await this.CategoryRepository.find();
      if(categories.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT CATEGORIES"
        });
      }
      return categories;
      }catch(err:any){
        throw ManageError.signedError(err.message);
      }
  }

  async findOne(id: number):Promise<Category> {
    try{
      const categorie:Category=await this.CategoryRepository.findOneBy({id:id});
      if(!categorie){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT CATEGORIES"
        });
      }
      return categorie;
      }catch(err:any){
        throw ManageError.signedError(err.message);
      }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<string> {
    try{
      const {affected}:number | any=await this.CategoryRepository.update(id,updateCategoryDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT CATEGORIES"
        });
      }
      return "melo";
      }catch(err:any){
        throw ManageError.signedError(err.message);
      }
  }

  async remove(id: number) :Promise<string>{
    try{
      const {affected}:number | any=await this.CategoryRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT CATEGORIES"
        });
      }
      return "melo";
      }catch(err:any){
        throw ManageError.signedError(err.message);
      }
  }
}
