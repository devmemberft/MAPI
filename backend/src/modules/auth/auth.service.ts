import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../users/entities/user.entity';
import { BcryptService } from './hash.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';
import * as dotenv from 'dotenv'
dotenv.config()


@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private usersService:UsersService,
        private jwtService:JwtService,
        private bcryptService:BcryptService,
    ) {}

    async register(createUserDto:CreateUserDto):Promise<Partial<User>> {
        const userExists = await this.usersService.checkUsername(createUserDto.username);
        const emailExists = await this.usersService.checkEmail(createUserDto.email);
        if(userExists || emailExists) { throw new BadRequestException(`User credentials ${createUserDto.username && createUserDto.email} already exists.`); }

        const hashedPassword = await this.bcryptService.hashPassword(createUserDto.password);
        const user = await this.userRepository.save({...createUserDto, password:hashedPassword});
        const {password, ...cleanUser} = user;
        return cleanUser;
    }

    async validateUser(loginUserDto: LoginUserDto):Promise<User> {
        const { email, password } = loginUserDto;
        const user = await this.usersService.findUserByEmail(email);
        const checkPassword = await this.bcryptService.comparePassword(password,user.password);
        if(!checkPassword) { throw new UnauthorizedException('Bad credentials.'); }
        return user;
    }   


    async login(user: LoginUserDto) {
        const payload: JwtPayload = { email: user.email, sub: user.user_id, role:user.role };
        return{
            access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRATION }),
        };
    }
}
