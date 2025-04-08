import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { findUserDto } from './dto/find-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    findUserByFilter(filter: findUserDto, page?: number, pageSize?: number): Promise<User[]>;
    checkUsername(username: string): Promise<boolean>;
    checkEmail(email: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<User>;
    findUserByName(username: string): Promise<User>;
}
