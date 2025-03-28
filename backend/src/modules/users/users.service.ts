import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { findUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,) {}

    async createUser(createUserDto:CreateUserDto):Promise<User> {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return user;
    }

    async updateUser(id:string, updateUserDto:UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        if(!user) { throw new NotFoundException('User not found.'); }

        Object.assign(user,updateUserDto);
        return this.userRepository.save(user);
    }

    async deleteUser(id:string):Promise<void> {
        await this.userRepository.delete(id);
    }

    async findAllUsers():Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserById(id:string):Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        if(!user) { throw new NotFoundException('User not found.'); }
        return user;
    }

    async findUserByFilter(filter:findUserDto): Promise<User> {
        const users = await this.userRepository.find({where:filter})
        if(users.length === 0 ) { throw new NotFoundException('User not found.'); }
        return users[0];
    }
}
