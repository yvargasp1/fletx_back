import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { SaleDTO } from './dto/sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
    private productService: ProductsService,
  ) {}

  async create(createSaleDto: SaleDTO[]) {
    let notStock = false;
    const productsToUpdate = [];

    // Verifica el stock de cada producto
    await Promise.all(
      createSaleDto.map(async (item: SaleDTO) => {
        const product = await this.productService.findOne(item.product_id);
        if (product.length) {
          if (product[0].stock - item.amount >= 0) {
            // Si hay suficiente stock, guarda el producto para actualizar su stock posteriormente
            productsToUpdate.push({
              id: product[0].id,
              stock: product[0].stock - item.amount,
            });
          } else {
            // Si no hay suficiente stock, marca notStock como true
            notStock = true;
          }
        }
      }),
    );

    if (!notStock) {
      // Actualiza el stock de los productos y guarda la venta en la base de datos
      await Promise.all(
        productsToUpdate.map(async (product) => {
          console.log(product);
          await this.productService.update(product.id, product);
        }),
      );

      await Promise.all(
        createSaleDto.map(async (item: SaleDTO) => {
          item.total = item.amount * item.price;
        }),
      );
      await this.saleRepo.save(createSaleDto);
    } else {
      // Si algún producto no tiene suficiente stock, devuelve una excepción
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
    }
  }

  findAll() {
    return this.saleRepo.find();
  }

  findOne(id: number) {
    return this.saleRepo.findBy({
      id: id,
    });
  }

  update(id: number, updateSaleDto: SaleDTO) {
    return `This action updates a #${id} sale`;
  }

  async remove(id: number) {
    const sale = await this.findOne(id);
    if (sale.length) {
      return this.saleRepo.delete({
        id: id,
      });
    } else {
      return new HttpException('Sale not found', HttpStatus.NOT_FOUND);
    }
  }
}
