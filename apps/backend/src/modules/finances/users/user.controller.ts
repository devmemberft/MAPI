import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { EditUserProfile } from "./dto/edit-user-profile.dto";
//rutas protegidas
@Controller('finances/users')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Patch('edit-profile/:user_id')
    async editUser(@Param('user_id') user_id:string, @Body() editUserProfile:EditUserProfile):Promise<User>{
        return await this.userService.update(user_id, editUserProfile);
    }

    @Delete('delete/:user_id')
    async deleteUser(@Param('user_id') user_id:string):Promise<void>{
        return await this.userService.delete(user_id);
    } //solicitar verificacion escribiendo toda la secret_key

    @Get()
    async findAll():Promise<User[]>{
        return await this.userService.find();
    }
}