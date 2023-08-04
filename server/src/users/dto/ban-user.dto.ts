import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';

enum UserRoleStatus {
  Active = 'active',
  Blocked = 'blocked',
}

export class BanUserDto {
  @IsNotEmpty({ message: 'The userId is required' })
  readonly userId: number;

  @IsOptional()
  readonly banReason?: string;

  @IsNotEmpty({ message: 'The status is required' })
  @IsEnum(UserRoleStatus, {
    message: 'Status must be active or blocked',
  })
  readonly status: string;
}
