import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-pw.dto';
import { BcryptService } from '../auth/hash.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private bcryptService:BcryptService,
    ) {}

    async updateUsername(user_id:string, updateUsernameDto:UpdateUsernameDto): Promise<User> {
        const { username } = updateUsernameDto;
        const user = await this.findUserById(user_id);
        Object.assign(user,{username});
        const updatedUser = await this.userRepository.save(user);
 
        return updatedUser;
    }

    async updateUserPassword(id:string, updateUserPasswordDto:UpdateUserPasswordDto):Promise<User> {
        const { password } = updateUserPasswordDto;
        const user = await this.findUserById(id);
        const checkPassword = await this.bcryptService.comparePassword(password,user.password);

        if(checkPassword) { throw new ConflictException('New password must be different from old password.'); }

        const hashedPassword = await this.bcryptService.hashPassword(password);

        user.password=hashedPassword;

        const updatedUser = await this.userRepository.save(user);

        return updatedUser;
    }

    async deleteUser(id:string):Promise<void> {
        const user = await this.findUserById(id);
        await this.userRepository.remove(user);
    }

    async findAllUsers():Promise<User[]> {
        return this.userRepository.find({select: ['user_id','username', 'email'],});
    }

    async findUserById(user_id:string):Promise<User> {
        const user = await this.userRepository.findOne({
            where: { user_id },
            select: ['user_id', 'username', 'email'], //exceptuar la pw
        });
        if(!user) { throw new NotFoundException(`User with id: ${user_id} not found`); }
        return user;
    }

    async findUserByFilter(filter:findUserDto, page: number=1, pageSize: number=10): Promise<User[]> {
        const [users, total] = await this.userRepository.findAndCount({
            where: filter,
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: ['user_id','username', 'email'],
        });
        if(users.length === 0 ) { throw new NotFoundException(`User with filter: ${JSON.stringify(filter)} not found`); }
        return users;
    }

    async checkUsername(username:string):Promise<boolean>{
        const user = await this.userRepository.findOneBy({username});
        if(user) { return true; }
        return false;
    }

    async checkEmail(email:string):Promise<boolean>{
        const mail = await this.userRepository.findOneBy({email});
        if(mail) {return true;}
        return false;
    }

    // No usar este metodo, contiene informacion sensible
    async findUserByEmail(email:string):Promise<User> {
        const userEmail = await this.userRepository.findOne({where: {email}, select: ['user_id', 'email', 'username', 'role', 'password']});
        if(!userEmail) { throw new NotFoundException(`User with email ${email} not found.`); }
        return userEmail;
    }

    async findUserByName(username:string):Promise<User> {
        const user = await this.userRepository.findOne({where:{username}, select:['user_id','email', 'username',]});
        if(!user) { throw new NotFoundException(`${username} not found.`); }
        return user;
    }
}
