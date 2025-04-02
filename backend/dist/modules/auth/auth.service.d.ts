import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { ValidateUserDto } from './dto/validate.dto';
import { BcryptService } from './hash.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private usersService;
    private jwtService;
    private bcryptService;
    constructor(userRepository: Repository<User>, usersService: UsersService, jwtService: JwtService, bcryptService: BcryptService);
    validateUser(id: string, validateUserDto: ValidateUserDto): Promise<User>;
    register(createUserDto: CreateUserDto): Promise<User>;
    login(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
