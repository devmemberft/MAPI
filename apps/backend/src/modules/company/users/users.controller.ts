import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/roles.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UpdateUserPasswordDto } from './dto/update-user-pw.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Moderator)
    @Put('update/name/:user_id')
    async updateUsername(@Param('user_id') user_id:string, @Body() updateUsernameDto:UpdateUsernameDto):Promise<User> {
        return this.usersService.updateUsername(user_id,updateUsernameDto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Moderator)
    @Put('/update/pw/:user_id')
    async updateUserPassword(@Param('user_id') user_id:string, @Body() updateUserPasswordDto:UpdateUserPasswordDto):Promise<Partial<User>>{
        return this.usersService.updateUserPassword(user_id,updateUserPasswordDto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Moderator)
    @Delete('delete/:user_id')
    async deleteUser(@Param('user_id') user_id:string):Promise<void> { return this.usersService.deleteUser(user_id); }

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
