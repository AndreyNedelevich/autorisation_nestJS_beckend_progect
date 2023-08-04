import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUsersDto } from './dto/getAllUsers';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Role } from 'src/roles/roles.model';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll(
    @Query()
    {
      limit = '5',
      page = '1',
      query,
      sort = 'DESC',
      userStatus,
    }: GetAllUsersDto,
  ) {
    return this.usersService.getAllUsers(
      +limit,
      +page,
      query,
      sort,
      userStatus,
    );
  }

  @ApiOperation({ summary: 'Give a role for user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Chenge status user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  chengeStatusUser(@Body() dto: BanUserDto) {
    return this.usersService.chengeStatusUser(dto);
  }

  @ApiOperation({ summary: 'Get user roles' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/:id/roles')
  getRolesByUser(@Param('id') id: string): Promise<Role[]> {
    return this.usersService.getRolesByUser(+id);
  }

  @ApiOperation({ summary: 'Delete user role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':userId/roles/:roleId')
  async removeRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    await this.usersService.removeRoleFromUser(+userId, +roleId);
    return 'Role removed from the user';
  }
}
