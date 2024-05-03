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
      ID : id
    });

    return category
  }

  update(id: number, updateCategoryDto: Category) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
