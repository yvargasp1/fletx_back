
import { IsInt, IsNotEmpty } from 'class-validator';

export class ProductDTO {
  id: number;
  date_created: Date;
  name: string;
  @IsInt()
  @IsNotEmpty()
  category_id: number;
  price: number;
  value: number;
  stock: number;
}