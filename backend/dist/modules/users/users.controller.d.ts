import { UsersService } from './users.service';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { User } from './entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-pw.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateUsername(user_id: string, updateUsernameDto: UpdateUsernameDto): Promise<User>;
    updateUserPassword(user_id: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<Partial<User>>;
    deleteUser(user_id: string): Promise<void>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    findUserByFilter(filter: findUserDto): Promise<User[]>;
}
