import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ValidateUserDto } from './dto/validate.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(user: CreateUserDto): Promise<Partial<User>>;
    login(validateUserDto: ValidateUserDto): Promise<{
        access_token: string;
    }>;
}
