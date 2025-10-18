import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../company/users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../company/users/entities/user.entity';
import { BcryptService } from './hash.service';
import { CreateUserDto } from '../company/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import * as dotenv from 'dotenv'
import { ValidateUserDto } from './dto/validate.dto';
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
        const dtoInstance = plainToInstance(CreateUserDto,createUserDto);
        const error = await validate(dtoInstance);
        if(error.length > 0) { throw new BadRequestException('Format is not correct.'); }
        const userExists = await this.usersService.checkUsername(createUserDto.username);
        const emailExists = await this.usersService.checkEmail(createUserDto.email);
        if(userExists || emailExists) { throw new BadRequestException(`User credentials ${createUserDto.username} and ${createUserDto.email} already exists.`); }

        const hashedPassword = await this.bcryptService.hashPassword(createUserDto.password);
        const user = await this.userRepository.save({...createUserDto, password:hashedPassword});
        const {password, ...cleanUser} = user;
        return cleanUser;
    }

    async validateUser(validateUserDto: ValidateUserDto):Promise<User> {
        const { email, password } = validateUserDto;
        const user = await this.usersService.findUserByEmail(email);
        const checkPassword = await this.bcryptService.comparePassword(password,user.password);
        if(!checkPassword) { throw new UnauthorizedException('Bad credentials.'); }
        return user;
    }   


    async login(user: LoginUserDto) {
        const payload: JwtPayload = { email: user.email, sub: user.user_id, role:user.role, secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION || '15m', };
        
        const access_token = this.jwtService.signAsync(payload);

        const refresh_token = this.jwtService.signAsync(payload);
        
        return{ access_token, refresh_token };
    }

    async refresh(refresh_token:string){
        try {
            const decoded = this.jwtService.verify(refresh_token,{
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.usersService.findUserByEmail(decoded.email);
            if(!user) throw new UnauthorizedException('Can not Refresh, User not found.');

            const payload = { sub:user.user_id, email: user.email, role: user.role, secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION || '15m', };

            const access_token = this.jwtService.signAsync(payload);

            const new_refresh_token = this.jwtService.signAsync(payload);

            return { access_token, new_refresh_token };

        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token, contact support.');
        }
    }
}
