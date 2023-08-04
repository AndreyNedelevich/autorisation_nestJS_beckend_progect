import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import {CreateUserDto} from '../users/dto/create-user.dto';
import {UsersService} from '../users/users.service';
import {User} from '../users/users.model';
import {ITokenPeyload} from './dto/ITokenPeyload';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async login(userDto: CreateUserDto) {
        const foundUser = await this.validateUser(userDto);
        const user = this.filterUserFields(foundUser);
        const token = await this.generateToken(foundUser);
        return {user, token};
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(
                'User with this email exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const createUser = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });
        const user = this.filterUserFields(createUser);
        const token = await this.generateToken(createUser);
        return { user, token};
    }

    async findUserByToken(payload: ITokenPeyload) {
        const user = await this.userService.getUserByEmail(payload.email);
        if (!user) {
            throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
        }
        const userMapper = this.filterUserFields(user);
        return userMapper;
    }

    private filterUserFields(user: User): Partial<User> {
        const {roles, banReason, id, email, banned, createdAt} = user;
        return {id, email, roles, banned, banReason, createdAt};
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return this.jwtService.sign(payload);
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({
                message: 'Wrong email address or password',
            });
        }
        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        );
        if (passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({
            message: 'Wrong email address or password',
        });
    }
}
