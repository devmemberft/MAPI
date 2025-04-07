import { UsersService } from './users.service';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUserById(id: string): Promise<void>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    findUserByFilter(filter: findUserDto): Promise<User[]>;
}
