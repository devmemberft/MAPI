import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, Transaction } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EditUserProfile } from "./dto/edit-user-profile.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User,'accountingConnection')
        private readonly userRepository:Repository<User>,
    ){}

    async create(data:{user_secret_key_hashed:string}){
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    //add nickname
    async update(user_id:string, editUserProfile:EditUserProfile):Promise<User>{
        const checkUser = await this.userRepository.findOne({where:{user_id:user_id}})
        if(!checkUser) { throw new NotFoundException(`The user was not found.`); }
        const userWithNickname = new User();
        userWithNickname.user_nickname = editUserProfile.user_nickname;
        return this.userRepository.save(userWithNickname);
    } 
    
    async delete(user_secret_key_hashed:string):Promise<void>{
        await this.userRepository.delete(user_secret_key_hashed);
    }
    
    async find():Promise<User[]>{
        return await this.userRepository.find();
    }

    async findByAccessKey(access_key:string){
        const users = await this.userRepository.find();
        for(const user of users){
            if(await bcrypt.compare(access_key, user.user_secret_key_hashed)) return user;
        }
        return null
    }
}