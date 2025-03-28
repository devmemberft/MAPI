import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { findUserDto } from './dto/find-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    findUserByFilter(filter: findUserDto): Promise<User>;
}
