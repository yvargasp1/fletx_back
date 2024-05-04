import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), ProductsModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
