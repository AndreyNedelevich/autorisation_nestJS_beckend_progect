import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { DeletePostDto } from './dto/delete-post.dto';
import { GetPostsDto } from './dto/getPostsDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getPostsByUser(
    @Query()
    { userId, limit = '5', page = '1', query, sort = 'DESC' }: GetPostsDto,
  ) {
    return this.postService.getPostsByUser(+userId, +limit, +page, query, sort);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param() params: DeletePostDto) {
    const { id } = params;
    const deletedPost = await this.postService.deletePost(+id);
    return { message: 'Post deleted successfully' };
  }
}
