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
  ID: number;
  @Column()
  Fecha_creacion: Date;
  @Column()
  Nombre: string;
  @Column()
  Precio: number;
  @Column()
  Valor: number;
  @Column()
  Stock: number;
  @Column()
  categoria_id: number;

  @ManyToOne(() => Category, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  category: Category;
}
