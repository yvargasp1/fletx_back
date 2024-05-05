
import { IsInt, IsNotEmpty } from 'class-validator';

export class ProductDTO {
  id: number;
  @IsNotEmpty()
  date_created: Date;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  category_id: number;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  value: string;
  @IsNotEmpty()
  type : string;
  @IsNotEmpty()
  stock: number;
  image: string;
}