import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { findUserDto } from './dto/find-user.dto';
import { BcryptService } from '../auth/hash.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private readonly bcryptService:BcryptService,
    ) {}

    async createUser(createUserDto:CreateUserDto):Promise<User> {
        const {password} = createUserDto;

        const hashedPassword = await this.bcryptService.hashPassword(password);
        const user = await this.userRepository.save({...createUserDto, password:hashedPassword});
        return user;
    }

    async updateUser(id:string, updateUserDto:UpdateUserDto): Promise<User> {
        const user = await this.findUserById(id);
        Object.assign(user,updateUserDto);
        return this.userRepository.save(user);
    }

    async deleteUser(id:string):Promise<void> {
        const user = await this.findUserById(id);
        await this.userRepository.delete(id);
    }

    async findAllUsers():Promise<User[]> {
        return this.userRepository.find({select: ['id','username', 'email'],});
    }

    async findUserById(id:string):Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'username', 'email'], //exceptuar la pw
        });
        if(!user) { throw new NotFoundException(`User with id: ${id} not found`); }
        return user;
    }

    async findUserByFilter(filter:findUserDto, page: number=1, pageSize: number=10): Promise<User[]> {
        const [users, total] = await this.userRepository.findAndCount({
            where: filter,
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: ['id','username', 'email'],
        });
        if(users.length === 0 ) { throw new NotFoundException(`User with filter: ${JSON.stringify(filter)} not found`); }
        return users;
    }
}
