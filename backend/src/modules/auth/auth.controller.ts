import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() user: CreateUserDto):Promise<User> {
        return await this.authService.register(user);
    }

    @Post('login')
    async login(@Body() user:LoginUserDto) {
        return await this.authService.login(user);
    }
}
