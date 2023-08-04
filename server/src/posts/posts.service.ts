import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  Post: any;
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(dto: CreatePostDto) {
    const post = await this.postRepository.create({ ...dto });
    return post;
  }

  async getPostsByUser(
    userId: number,
    limit: number,
    page: number,
    search: string,
    sort: 'ASC' | 'DESC',
  ) {
    let where: any = {
      userId,
    };
    if (search !== undefined && search.trim() !== '') {
      where = {
        ...where,
        content: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    if (limit === -1) {
      const { count, rows: posts } = await this.postRepository.findAndCountAll({
        where,
        order: [['createdAt', sort]],
      });
      return {
        page,
        limit: count,
        totalCount: count,
        posts,
      };
    } else {
      const offset = limit * (page - 1);
      const { count, rows: posts } = await this.postRepository.findAndCountAll({
        where,
        order: [['createdAt', sort]],
        limit,
        offset,
      });
      return {
        page,
        limit,
        totalCount: count,
        posts,
      };
    }
  }

  async deletePost(id: number) {
    try {
      await this.postRepository.destroy({ where: { id } });
    } catch {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }
}
