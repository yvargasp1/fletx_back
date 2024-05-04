
import { IsNotEmpty } from 'class-validator';

export class SaleDTO {
  id: number;
  @IsNotEmpty()
  product_id: number;
  @IsNotEmpty()
  date_sale: Date;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  price: number;
  total: number;
}
