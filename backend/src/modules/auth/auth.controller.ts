import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() user:User) {
        return this.authService.login(user);
    }
}
