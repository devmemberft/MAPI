import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, /* RolesGuard*/)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Put(':id')
    async updateUser(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto):Promise<User> {
        return this.usersService.updateUser(id,updateUserDto);
    }

    //@Roles('admin')
    @Delete(':id')
    async deleteUser(@Param('id') id:string):Promise<void> { return this.usersService.deleteUser(id); }

    @Get()
    async findAllUsers():Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @Get(':id')
    async findUserById(@Param('id') id:string): Promise<User> { return this.usersService.findUserById(id); }

    @Get(':search')
    async findUserByFilter(@Query() filter:findUserDto):Promise<User[]> {
        return await this.usersService.findUserByFilter(filter);
    }
}
