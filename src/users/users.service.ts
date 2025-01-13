import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypt from 'bcrypt';

interface DataVerifyUser{
  email:string;
  password:string
}

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private UserRepository:Repository<User>
  ){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    try{  
      const create:User=this.UserRepository
      .create(createUserDto);
      const hashPassword:string=await crypt.hash(createUserDto.password,10);
      await this.UserRepository.save({...create,password:hashPassword});
      return create;
    }catch(err:any){
      throw err;
    }
  }

  async findAll():Promise<User[]> {
    try{  
      const users:User[]=await this.UserRepository.find();
      if(users.length==0){

      }
      return users;
    }catch(err:any){
      
    }
  }

  async findOne(id: number) :Promise<User>{
    try{  
      const user:User=await this.UserRepository.findOneBy({id:id});
      if(!user){

      }
      return user;
    }catch(err:any){
      
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<string> {
    try{  
      const {affected}:number | any=await this.UserRepository.update(id,updateUserDto);
      if(affected==0){

      }
      return "melo";
    }catch(err:any){
      
    }
  }

  async remove(id: number):Promise<string>  {
    try{  
      const {affected}:number | any=await this.UserRepository.delete(id);
      if(affected==0){

      }
      return "melo";
    }catch(err:any){
      
    }
  }


  async verifyUserByEmailAndPassword(dataUser:DataVerifyUser):Promise<User | null>  {
    try{  
      const user:User=await this.UserRepository.findOneBy({email:dataUser.email});
      if(!user || !await crypt.compare(dataUser.password,user.password)){
        return null
      }
      return user;
    }catch(err:any){
      
    }
  }
}
