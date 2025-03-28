import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto):Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUser(@Param('id') id:string, @Body() UpdateUserDto:UpdateUserDto):Promise<User> {
        return this.usersService.updateUser(id,UpdateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:string):Promise<void> { return this.usersService.deleteUser(id); }

    @Get()
    async findAllUsers():Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @Get(':id')
    async findUserById(@Param('id') id:string): Promise<User> {
        return this.usersService.findUserById(id);
    }

    @Get('search')
    async findUserByFilter(@Body() filter:findUserDto):Promise<User> {
        return await this.usersService.findUserByFilter(filter);
    }
}
