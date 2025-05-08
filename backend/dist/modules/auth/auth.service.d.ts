import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { BcryptService } from './hash.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';
import { ValidateUserDto } from './dto/validate.dto';
export declare class AuthService {
    private userRepository;
    private usersService;
    private jwtService;
    private bcryptService;
    constructor(userRepository: Repository<User>, usersService: UsersService, jwtService: JwtService, bcryptService: BcryptService);
    register(createUserDto: CreateUserDto): Promise<Partial<User>>;
    validateUser(validateUserDto: ValidateUserDto): Promise<User>;
    login(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
