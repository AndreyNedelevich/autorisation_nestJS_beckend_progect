import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Поле "value" является обязательным' })
  readonly value: string;

  @IsOptional()
  readonly description: string;
}
