import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-pw.dto';
import { BcryptService } from '../auth/hash.service';
export declare class UsersService {
    private userRepository;
    private bcryptService;
    constructor(userRepository: Repository<User>, bcryptService: BcryptService);
    updateUsername(user_id: string, updateUsernameDto: UpdateUsernameDto): Promise<User>;
    updateUserPassword(user_id: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<Partial<User>>;
    deleteUser(id: string): Promise<void>;
    findAllUsers(): Promise<User[]>;
    findUserById(user_id: string): Promise<User>;
    findUserByFilter(filter: findUserDto, page?: number, pageSize?: number): Promise<User[]>;
    checkUsername(username: string): Promise<boolean>;
    checkEmail(email: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<User>;
    findUserByName(username: string): Promise<User>;
}
