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


@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private usersService:UsersService,
        private jwtService:JwtService,
        private bcryptService:BcryptService,
    ) {}

    async register(createUserDto:CreateUserDto):Promise<User> {
        const {username, email, password} = createUserDto;

        const userExists = await this.usersService.checkUsername(username);
        const emailExists = await this.usersService.checkEmail(email);
        if(userExists || emailExists) { throw new BadRequestException(`User credentials ${username && email} already exists.`); }

        const hashedPassword = await this.bcryptService.hashPassword(password);
        const user = await this.userRepository.save({...createUserDto, password:hashedPassword});
        return user;
    }

    async validateUser(loginUserDto: LoginUserDto):Promise<User> {
        const {id, email, password, role} = loginUserDto;
        const user = await this.usersService.findUserByEmail(email);
        const checkPassword = await this.bcryptService.comparePassword(password,user.password);
        if(!checkPassword) { throw new UnauthorizedException('Bad credentials.'); }
        return user;
    }   


    async login(user: LoginUserDto) {
        const payload: JwtPayload = { email: user.email, sub: user.id, role:user.role };
        return{
            access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRATION || '5m' }),
        };
    }
}
