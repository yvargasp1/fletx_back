import { IsInt, IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  ID: number;
  @IsNotEmpty()
  Nombre: string;
  Descripcion: string;
}
