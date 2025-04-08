import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { LocalStrategy } from './strategies/local.strategy';
export declare class AuthController {
    private readonly authService;
    private localStrategy;
    constructor(authService: AuthService, localStrategy: LocalStrategy);
    register(user: CreateUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
