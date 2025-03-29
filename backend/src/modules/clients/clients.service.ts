import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-user.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private clientRepository:Repository<Client>,
    ){}

    async createClient(createClientDto:CreateClientDto):Promise<Client>{
        const {dni} = createClientDto;
        const clientExists = await this.findClientByDni(dni);
        if(clientExists) { throw new BadRequestException(`User with dni: ${dni} already exists.`); }

        const client = await this.clientRepository.save(createClientDto);

        return client;
    }

    async updateClient(dni:number,updateClientDto:UpdateClientDto):Promise<Client>{
        const client = await this.findClientByDni(dni);
        Object.assign(client,updateClientDto);
        return this.clientRepository.save(client);

    }

    async deleteClient(dni:number):Promise<void>{
        const client = await this.findClientByDni(dni);
        await this.clientRepository.delete(client);
    }

    async findAllClients(){
        return await this.clientRepository.find();
    }

    async findClientByDni(dni:number){
        const client = await this.clientRepository.findOneBy({dni});
        if(!client) { throw new NotFoundException(`User with dni: ${dni} not found.`); }

        return client;
    }
}
