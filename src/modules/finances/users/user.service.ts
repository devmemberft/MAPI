import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository, Transaction } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EditUserProfileDto } from "./dto/edit-user-profile.dto";
import * as bcrypt from 'bcrypt';
import { DeleteAccountDto } from "./dto/delete-account.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User,'accountingconnection')
        private readonly userRepository:Repository<User>,
    ){}

    async create(data:{user_secret_key_hashed:string}){
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    //add nickname
    async update(user_id:string, editUserProfileDto:EditUserProfileDto):Promise<User>{

        const {user_nickname} = editUserProfileDto;
        const user = await this.findUserById(user_id);

        if(user_nickname && user.user_nickname !== user_nickname ) {
            const exists = await this.userRepository.findOne({where:{user_nickname}});

            if(exists && exists.user_id !== user.user_id) {
                throw new ConflictException(`The nickname is already in use. `);
            }

            user.user_nickname = user_nickname;
        }
        return this.userRepository.save(user);
    } 
    // los que se  aferran a la muerte, viven. Y los que se aferran a la vida, mueren.
    
    async delete(user_id:string, deleteAccountDto:DeleteAccountDto):Promise<void>{
        const { access_key } = deleteAccountDto;
        const user = await this.findUserById(user_id);
        const match = await bcrypt.compare(access_key, user.user_secret_key_hashed);
        if(!match) { throw new UnauthorizedException(`The entered access Key: ${access_key} is not valid. `); }
        
        await this.userRepository.remove(user); // al eliminar el usuario se eliminan todas las transacciones relacionadas gracias al onDelete:'CASCADE' de la entidad.
    }
    
    async find():Promise<User[]>{
        return await this.userRepository.find();
    }

    async findUserById(user_id:string):Promise<User>{
        const user = await this.userRepository.findOneBy({user_id});
        if(!user) { throw new NotFoundException(`The user was not found. `); }

        return user;
    }

    async findValidUserByAccessKey(access_key:string):Promise<User | null>{
        const users = await this.userRepository.find({where:{used:true}});
        for(const user of users){
            const match = await bcrypt.compare(access_key, user.user_secret_key_hashed);
            if(match) return user;
        }
        return null
    }

    async markAccessKeyAsUsed(user_id:string):Promise<void>{
        await this.userRepository.update(user_id,{used:true});
    }
}