import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { ProductsService } from 'src/products/products.service';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @Inject(forwardRef(() => ProductsService))
    private productService: ProductsService,
  ) {}
  create(createCategoryDto: CategoryDTO) {
    return this.categoryRepo.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.find();
  }
  async findOne(id: number) {
   
    const category = await this.categoryRepo.findBy({
      id: id,
    });

    return category;
  }

  update(id: number, updateCategoryDto: Category) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    const category = await this.findOne(id);
     const product = this.productService.findByCategory(id);
     if ((await product).length) {
       return new HttpException('Product  found', HttpStatus.FOUND);
     }else{
       if (category.length) {
         return this.categoryRepo.delete({
           id: id,
         });
       } else {
         return new HttpException('Category not found', HttpStatus.NOT_FOUND);
       }

     }
  }
}
