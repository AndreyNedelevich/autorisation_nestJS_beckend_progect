import { IsOptional, IsString } from 'class-validator';

export class GetPostsDto {
  @IsString()
  userId: string;

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
}
