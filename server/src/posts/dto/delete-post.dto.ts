import { IsNotEmpty, IsInt } from 'class-validator';

export class DeletePostDto {
  @IsNotEmpty()
  id: number;
}
