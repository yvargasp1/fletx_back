import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from './dto/category.dto';
import { Category } from './entities/category.entity';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  create(createCategoryDto: CategoryDTO) {

    this.categoryRepo.save(createCategoryDto)
  }

  findAll() {
    return this.categoryRepo.find();
  }
  async findOne(id: number) {
     
    const category = await this.categoryRepo.findBy({
      id : id
    });

    return category
  }

  update(id: number, updateCategoryDto: Category) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    if(category.length){
      return this.categoryRepo.delete({
        id : id
      })

    }else{
       return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}
