import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { LocalStrategy } from './strategies/local.strategy';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private localStrategy:LocalStrategy) {}

    @Post('register')
    async register(@Body() user: CreateUserDto):Promise<User> {
        return await this.authService.register(user);
    }

    @Post('login')
    async login(@Body() user:LoginUserDto) {
        const {id, email, password} = user;
        const userVerification = await this.localStrategy.validate(id,email,password);
        if(!userVerification){throw new BadRequestException(`Credenciales incorrectas, intentelo nuevamente`)}
        return await this.authService.login(user);
    }
}
