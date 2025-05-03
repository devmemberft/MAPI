import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
    constructor(private clientsService:ClientsService){}

    @Post('add')
    async createClient(@Body() createClientDto:CreateClientDto):Promise<Client>{
        return await this.clientsService.createClient(createClientDto);
    }

    @Put('update')
    async updateClient(@Param('client_dni') client_dni:string,@Body() updateClientDto:UpdateClientDto):Promise<Client>{
        return await this.clientsService.updateClient(client_dni,updateClientDto);
    }

    @Delete('delete')
    async deleteClient(@Param('client_dni') client_dni:string):Promise<void> { return await this.clientsService.deleteClient(client_dni); }

    @Get()
    async findAllClients():Promise<Client[]>{ return await this.clientsService.findAllClients(); }

    @Get(':dni')
    async findClientByDni(@Param('client_dni') client_dni:string):Promise<Client> { return await this.clientsService.findClientByDni(client_dni); }

    @Get(':name')
    async findClientByName(@Param('client_name') client_name:string):Promise<Client> {return await this.clientsService.findClientByName(client_name); }
}
