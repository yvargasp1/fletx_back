import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  product_id: number;
  @Column()
  date_sale: Date;
  @Column()
  amount: number;
  @Column()
  price: number;
  @Column()
  total: number;
  @ManyToOne(() => Product, (product) => product.sale)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
