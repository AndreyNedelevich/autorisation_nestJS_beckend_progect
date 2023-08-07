import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { EUserStatus } from './dto/getAllUsers';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(
    limit: number,
    page: number,
    search: string,
    sort: string,
    userStatus: EUserStatus,
  ) {
    let where: any = {};

    if (userStatus !== undefined) {
      switch (userStatus) {
        case 'blocked':
          where.banned = true;
          break;
        case 'active':
          where.banned = false;
          break;
        case 'all':
          where;
          break;
        default:
          throw new HttpException(
            'Invalid status for search',
            HttpStatus.BAD_REQUEST,
          );
      }
    }

    if (search !== undefined && search.trim() !== '') {
      where = {
        ...where,
        email: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    const { count } = await this.userRepository.findAndCountAll({
      where,
      attributes: ['id'],
    });

    if (limit === -1) {
      const users = await this.userRepository.findAll({
        where,
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
        ],
        order: [['createdAt', sort]],
      });
      return {
        page,
        limit: count,
        totalCount: count,
        users,
      };
    } else {
      const offset = limit * (page - 1);
      const users = await this.userRepository.findAll({
        where,
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
        ],
        order: [['createdAt', sort]],
        limit: limit,
        offset: offset,
      });
      return {
        page,
        limit,
        totalCount: count,
        users,
      };
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(+dto.userId, {
      include: Role,
    });
    const role = await this.roleService.getRoleByValue(dto.value);

    const hasRole = user.roles.some((role) => role.value === dto.value);

    if (hasRole) {
      throw new HttpException(
        `Role "${dto.value}" already exists for the user`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role is not found', HttpStatus.NOT_FOUND);
  }

  async chengeStatusUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    switch (dto.status) {
      case 'blocked':
        user.banned = true;
        user.banReason = dto.banReason || '';
        break;
      case 'active':
        user.banned = false;
        user.banReason = dto.banReason || '';
        break;
      default:
        throw new HttpException('Invalid status value', HttpStatus.BAD_REQUEST);
    }
    await user.save();
    return user;
  }

  async getRolesByUser(Id: number): Promise<Role[]> {
    const user = await this.userRepository.findByPk(Id, {
      include: [
        {
          model: Role,
          through: { attributes: [] },
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(User);
    return user.roles;
  }

  async removeRoleFromUser(userId: number, roleId: number): Promise<void> {
    const user = await this.userRepository.findByPk(userId, { include: Role });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const role = user.roles.find((role) => role.id === roleId);
    if (!role) {
      throw new HttpException(
        'Role not found for this user',
        HttpStatus.NOT_FOUND,
      );
    }
    if (role.value === 'USER') {
      throw new HttpException(
        'Deleting the default role USER is not allowed',
        HttpStatus.BAD_REQUEST,
      );
    }

    await user.$remove('roles', roleId);
  }
}
