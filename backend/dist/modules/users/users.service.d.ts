import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { findUserDto } from './dto/find-user.dto';
import { BcryptService } from '../auth/hash.service';
export declare class UsersService {
    private userRepository;
    private readonly bcryptService;
    constructor(userRepository: Repository<User>, bcryptService: BcryptService);
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    findUserByFilter(filter: findUserDto, page?: number, pageSize?: number): Promise<User[]>;
}
