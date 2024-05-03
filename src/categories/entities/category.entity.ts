import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  ID: number;
  @Column()
  Nombre: string;
  @Column()
  Descripcion: string;

  @OneToMany(() => Product, (producto) => producto.category)
  productos: Product[];
}
