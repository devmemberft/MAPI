import { UsersService } from './users.service';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: string, UpdateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    findUserByFilter(filter: findUserDto): Promise<User>;
}
