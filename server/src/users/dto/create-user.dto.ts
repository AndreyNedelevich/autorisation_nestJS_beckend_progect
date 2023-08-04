import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'EMAIL' })
  @IsNotEmpty({ message: 'EMAIL is required' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect EMAIL' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '12345', description: 'password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Not less than 4 and not more than 16' })
  readonly password: string;
}
