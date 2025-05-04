import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
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
        const { client_dni } = createClientDto;
        if(await this.clientRepository.findOneBy({client_dni})) { throw new BadRequestException(`User with dni: ${client_dni} already exists.`); }

        const client = await this.clientRepository.save(createClientDto);

        return client;
    }

    async updateClient(client_dni:string,updateClientDto:UpdateClientDto):Promise<Client>{
        const client = await this.findClientByDni(client_dni);
        Object.assign(client,updateClientDto); // pendiente: no puede actualizar direccion sin actualizar zona
        return this.clientRepository.save(client);

    }

    async deleteClient(client_dni:string):Promise<void>{
        await this.clientRepository.remove(await this.findClientByDni(client_dni));
    }

    async findAllClients():Promise<Client[]>{
        return await this.clientRepository.find();
    }

    async findClientByDni(client_dni:string):Promise<Client>{
        const client = await this.clientRepository.findOne({where:{client_dni:client_dni} });
        if(!client) { throw new NotFoundException(`User with dni ${client_dni} not found.`); }

        return client;
    }

    async findClientByName(client_name:string):Promise<Client>{
        const client = await this.clientRepository.findOneBy({client_name});
        if(!client) { throw new NotFoundException(`Client with ${client_name} was not found.`);}
        return client;
        
    }
}
