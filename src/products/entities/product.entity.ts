import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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
  value: number;
  @Column()
  stock: number;
  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
