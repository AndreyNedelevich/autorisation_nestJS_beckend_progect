import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Must be a string' })
  readonly title: string;

  @IsString({ message: 'Must be a string' })
  readonly content: string;

  @IsNotEmpty({ message: 'userId is required' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
}
