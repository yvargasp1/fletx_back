import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private categoryService : CategoriesService
  ) {}
  async create(createProductDto: Product) {
   const category = await this.categoryService.findOne(createProductDto.categoria_id)
   console.log(category)
   if(!category.length){
    return new HttpException('Category not found', HttpStatus.NOT_FOUND)
   }else{
  
    return this.productRepo.save(createProductDto)
   }
  }

  findAll() {
    return this.productRepo.find({
      relations: ['category'],
    });
  }


  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: Product) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
