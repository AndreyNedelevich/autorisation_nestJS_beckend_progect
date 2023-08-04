import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class AddRoleDto {
  @IsNotEmpty({ message: 'The userId is required' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;

  @IsNotEmpty({ message: 'The role  is required' })
  @IsString({ message: 'Must be a string' })
  readonly value: string;
}
