import { IsInt, IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  id: number;
  @IsNotEmpty()
  name: string;
  description: string;
}
