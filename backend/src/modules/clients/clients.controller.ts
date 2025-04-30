import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
    constructor(private clientsService:ClientsService){}

    @Post()
    async createClient(@Body() createClientDto:CreateClientDto):Promise<Client>{
        return await this.clientsService.createClient(createClientDto);
    }

    @Put(':dni')
    async updateClient(@Param('dni') dni:number,@Body() updateClientDto:UpdateClientDto):Promise<Client>{
        return await this.clientsService.updateClient(dni,updateClientDto);
    }

    @Delete('dni')
    async deleteClient(@Param('dni') dni:number):Promise<void> { return await this.clientsService.deleteClient(dni); }

    @Get()
    async findAllClients():Promise<Client[]>{ return await this.clientsService.findAllClients(); }

    @Get(':dni')
    async findClientByDni(@Param('dni') dni:number):Promise<Client> { return await this.clientsService.findClientByDni(dni); }
}
