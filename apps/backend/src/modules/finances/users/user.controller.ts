import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { EditUserProfileDto } from "./dto/edit-user-profile.dto";
import { DeleteAccountDto } from "./dto/delete-account.dto";
//rutas protegidas
@Controller('finances/users')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Patch('edit-profile')
    async editUser(@Query('user_id') user_id:string, @Body() editUserProfileDto:EditUserProfileDto):Promise<User>{
        return await this.userService.update(user_id, editUserProfileDto);
    }

    @Delete('delete')
    async deleteUser(@Query('user_id') user_id:string, @Body() deleteAccountDto:DeleteAccountDto):Promise<void>{
        return await this.userService.delete(user_id, deleteAccountDto);
    } //solicitar verificacion escribiendo toda la secret_key y presionando un boton de aceptar.

    @Get()
    async findAll():Promise<User[]>{
        return await this.userService.find();
    }
}