import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Moderator)
    @Put(':id')
    async updateUser(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto):Promise<User> {
        return this.usersService.updateUser(id,updateUserDto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Moderator)
    @Delete(':id')
    async deleteUser(@Param('id') id:string):Promise<void> { return this.usersService.deleteUser(id); }

    @UseGuards(RolesGuard)
    @Roles(Role.User, Role.Admin, Role.Moderator)
    @Get()
    async findAllUsers():Promise<User[]> {
        return this.usersService.findAllUsers();
    }
    
    @UseGuards(RolesGuard)
    @Roles(Role.User, Role.Admin, Role.Moderator)
    @Get(':id')
    async findUserById(@Param('id') id:string): Promise<User> { return this.usersService.findUserById(id); }

    @Get(':search')
    async findUserByFilter(@Query() filter:findUserDto):Promise<User[]> {
        return await this.usersService.findUserByFilter(filter);
    }
}
