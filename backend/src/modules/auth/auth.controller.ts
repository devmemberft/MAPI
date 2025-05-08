import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { ValidateUserDto } from './dto/validate.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() user: CreateUserDto):Promise<Partial<User>> {
        return await this.authService.register(user);
    }

    @Post('login')
    async login(@Body() validateUserDto:ValidateUserDto) {
        const {email, password} = validateUserDto;
        const userVerification = await this.authService.validateUser({email,password});
        if(!userVerification) { throw new BadRequestException('Imposible to validate user.')}
        return await this.authService.login(userVerification);
    }
}
