import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../users/entities/user.entity';
import { ValidateUserDto } from './dto/validate.dto';
import { BcryptService } from './hash.service';

@Injectable()
export class AuthService {
    constructor (
        private usersService:UsersService,
        private jwtService:JwtService,
        private bcryptService:BcryptService,
    ) {}

    async validateUser(id:string, validateUserDto:ValidateUserDto):Promise<User> {
        const { username, password } = validateUserDto;
        const user = await this.usersService.findUserById(id);
        if(username === user.username) {
            const passwordVerification = await this.bcryptService.comparePassword(password, user.password);
            if(!passwordVerification) { throw new UnauthorizedException(); }
        }
        return user;
    }

    async login(user: User) {
        const payload: JwtPayload = { username: user.username, sub: user.id };
        return{
            access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRATION ||'1h' }),
        };
    }
}
