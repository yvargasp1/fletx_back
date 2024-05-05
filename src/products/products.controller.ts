import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes , ValidationPipe, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductDTO } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProductDto: ProductDTO) {
    console.log(createProductDto);
    return this.productsService.create(createProductDto);
  }

  @Post('/photo')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './resources',
        filename(req, file, callback) {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split('').join('') + Date.now() + '.' + fileExtension;
          callback(null, newFileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  uploadPhoto(
    @Body() createProductDto: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const newProduct: Product = new Product();
    newProduct.category_id = createProductDto.category_id;
    if (file) {
      newProduct.image = file.path;
    }
    newProduct.name = createProductDto.name;
    newProduct.price = createProductDto.price;
    newProduct.stock = createProductDto.stock;
    newProduct.value = createProductDto.value;
    newProduct.date_created = createProductDto.date_created;
    newProduct.type = createProductDto.type;
    return this.productsService.create(newProduct);
  }

  @Get()
  findAll(@Query('sort') sort: any , @Query('lte') lte :any ,@Query('gte') gte:any , @Query('category') category:any) {
    return this.productsService.findAll(sort,lte,gte,category);
  }

  @Get('/order')
  orderBy(@Query('sort') sort: any) {
    return this.productsService.orderBy(sort);
  }
  @Get('/order')
  orderPrice(@Query('sort') sort: any) {
    return this.productsService.orderBy(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @Get(':id/category')
  findCategory(@Param('id') id: string) {
    return this.productsService.findByCategory(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './resources',
        filename(req, file, callback) {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split('').join('') + Date.now() + '.' + fileExtension;
          callback(null, newFileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: Product,
  ) {
    if (file) {
      updateProductDto.image = file.path;
    }
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
