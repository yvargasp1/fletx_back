import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private categoryService: CategoriesService,
  ) {}
  async create(createProductDto: ProductDTO) {
    const category = await this.categoryService.findOne(
      createProductDto.category_id,
    );
    console.log(category);
    if (!category.length) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    } else {
      return this.productRepo.save(createProductDto);
    }
  }

  findAll(sort: any, category: any, order: any) {
    let categories = [];
    console.log(order,sort)
    if (category) {
      categories = category.split(',');
      console.log(categories);
    }
    if (sort && !categories.length && order) {
      if ((order == 'ASC')) {
        return this.productRepo
          .createQueryBuilder('product')
          .orderBy(`product.${sort}`, 'ASC')
          .getMany();
      }
      if ((order == 'DESC')) {
        return this.productRepo
          .createQueryBuilder('product')
          .orderBy(`product.${sort}`, 'DESC')
          .getMany();
      }
    }

    if (category.length && sort && order) {
      console.log(category, category.length);
      if ((order == 'ASC')) {
        return this.productRepo
          .createQueryBuilder('product')
          .where(`product.category_id IN (:...categories)`, { categories })
          .orderBy(`product.${sort}`, 'ASC')
          .getMany();
      }
      if ((order == 'DESC')) {
        return this.productRepo
          .createQueryBuilder('product')
          .where(`product.category_id IN (:...categories)`, { categories })
          .orderBy(`product.${sort}`, 'DESC')
          .getMany();
      }
    }
  }

  findOne(id: number) {
    return this.productRepo.findBy({
      id: id,
    });
  }

  findByCategory(id: number) {
    return this.productRepo.find({
      where: {
        category_id: id,
      },
    });
  }

  orderBy(sort: string) {
    return this.productRepo
      .createQueryBuilder('product')
      .orderBy(`product.${sort}`, 'ASC')
      .getMany();
  }

  async update(id: number, updateProductDto: ProductDTO) {
    const category = await this.categoryService.findOne(
      updateProductDto.category_id,
    );
    console.log(category);
    if (!category.length) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    } else {
      const product = await this.findOne(id);
      if (product.length) {
        const obj = JSON.parse(JSON.stringify(updateProductDto));
        console.log(obj, product[0]);
        return this.productRepo.save({ ...product[0], ...obj });
      } else {
        return new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    console.log(product);
    if (product.length) {
      this.productRepo.delete({
        id: id,
      });
    } else {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
