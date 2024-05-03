
import { IsInt, IsNotEmpty } from 'class-validator';

export class ProductDTO {
  ID: number;
  Fecha_creacion: Date;
  Nombre: string;
  @IsInt()
  @IsNotEmpty()
  categoria_id: number;
  Precio: number;
  Valor: number;
  Stock: number;
}