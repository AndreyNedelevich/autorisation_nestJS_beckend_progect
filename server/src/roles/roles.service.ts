import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const checkRole = await this.getRoleByValue(dto.value);
    if (checkRole) {
      console.log(checkRole);
      throw new HttpException(
        'This role already exists in the database',
        HttpStatus.CONFLICT,
      );
    } else {
      const role = await this.roleRepository.create(dto);
      return role;
    }
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll({ raw: true });
    return roles;
  }
}

// HttpStatus.OK (200): Успешный запрос, данные возвращены.
// HttpStatus.CREATED (201): Успешный запрос, новый ресурс был создан.
// HttpStatus.NO_CONTENT (204): Успешный запрос, сервер успешно обработал запрос, но нет данных для возврата.
// HttpStatus.BAD_REQUEST (400): Синтаксическая ошибка или ошибка в запросе клиента.
// HttpStatus.UNAUTHORIZED (401): Пользователь не авторизован для доступа к запрашиваемому ресурсу.
// HttpStatus.FORBIDDEN (403): Запрещено выполнение запроса на сервере.
// HttpStatus.NOT_FOUND (404): Запрашиваемый ресурс не найден на сервере.
// HttpStatus.INTERNAL_SERVER_ERROR (500): Общая ошибка сервера, не удалось обработать запрос.
//HttpStatus.CONFLICT (409). Этот статус указывает на конфликт с текущим состоянием ресурса на сервере, что означает, что запрос не может быть выполнен из-за конфликта с существующим ресурсом.
