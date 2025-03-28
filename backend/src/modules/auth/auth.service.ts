import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../users/entities/user.entity';
import { ValidateUserDto } from './dto/validate.dto';

@Injectable()
export class AuthService {
    constructor (
        private usersService:UsersService,
        private jwtService:JwtService,
    ) {}

    async validateUser(validateUserDto:ValidateUserDto):Promise<User> {
        const { username, password } = validateUserDto
        const user = await this.usersService.findUserByFilter({username});
        if(!user) { throw new NotFoundException('User not found.'); }
        return user;
    }

    async login(user: User) {
        const {username, id} = user;
        const payload: JwtPayload = { username: user.username, sub: user.id };
        return{
            access_token: this.jwtService.sign(payload),
        }
    }
}
