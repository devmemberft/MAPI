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
        const {client_dni} = createClientDto;
        const clientExists = await this.findClientByDni(client_dni);
        if(clientExists) { throw new BadRequestException(`User with dni: ${client_dni} already exists.`); }

        const client = await this.clientRepository.save(createClientDto);

        return client;
    }

    async updateClient(client_dni:number,updateClientDto:UpdateClientDto):Promise<Client>{
        const client = await this.findClientByDni(client_dni);
        Object.assign(client,updateClientDto);
        return this.clientRepository.save(client);

    }

    async deleteClient(client_dni:number):Promise<void>{
        const client = await this.findClientByDni(client_dni);
        await this.clientRepository.delete(client);
    }

    async findAllClients(){
        return await this.clientRepository.find();
    }

    async findClientByDni(client_dni:number){
        const client = await this.clientRepository.findOneBy({client_dni});
        if(!client) { throw new NotFoundException(`User with dni: ${client_dni} not found.`); }

        return client;
    }
}
