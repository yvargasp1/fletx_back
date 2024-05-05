import { Category } from 'src/categories/entities/category.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  IsNull,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date_created: Date;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  value: string;
  @Column()
  stock: number;
  @Column()
  category_id: number;
  @Column()
  type: string;
  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Sale, (sale) => sale.product)
  sale: Sale[];

  @Column({
    nullable: true,
  })
  image: string;
}
