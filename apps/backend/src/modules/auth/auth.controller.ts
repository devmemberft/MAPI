import { Controller, Post, Body, BadRequestException, UnauthorizedException, Res, Get, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { ValidateUserDto } from './dto/validate.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('register')
    async register(@Body() user: CreateUserDto):Promise<Partial<User>> {
        return await this.authService.register(user);
    }

    @Post('login')
    async login(@Body() validateUserDto:ValidateUserDto, @Res({ passthrough: true }) res:Response ) {

        const {email, password} = validateUserDto;
        
        const userVerification = await this.authService.validateUser({email,password});
        
        if(!userVerification) { throw new BadRequestException('Imposible to validate user.')}

        const { access_token, refresh_token } = await this.authService.login(userVerification);

        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 15, // 15 min
        });

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        });

        return { access_token };
    }

    @Post('logout')
    async logout(@Res({ passthrough:true }) res: Response){
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return { message: 'Logged out.' };
    }

    @Get('profile')
    async profile(@Query('email') email:string){
        return await this.usersService.findUserByEmail(email);
    }
}
