import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum EUserStatus {
  Active = 'active',
  Blocked = 'blocked',
  All = 'all',
}

export class GetAllUsersDto {
  @IsString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  query?: string;

  @IsString()
  @IsOptional()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  @IsEnum(EUserStatus)
  userStatus?: EUserStatus;
}
