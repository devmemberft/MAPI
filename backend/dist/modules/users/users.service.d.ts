import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-pw.dto';
import { BcryptService } from '../auth/hash.service';
export declare class UsersService {
    private userRepository;
    private bcryptService;
    constructor(userRepository: Repository<User>, bcryptService: BcryptService);
    updateUserProfile(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updateUserPassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    findUserByFilter(filter: findUserDto, page?: number, pageSize?: number): Promise<User[]>;
    checkUsername(username: string): Promise<boolean>;
    checkEmail(email: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<User>;
    findUserByName(username: string): Promise<User>;
}
