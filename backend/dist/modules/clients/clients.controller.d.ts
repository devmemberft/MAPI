import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
export declare class ClientsController {
    private clientsService;
    constructor(clientsService: ClientsService);
    createClient(createClientDto: CreateClientDto): Promise<Client>;
    updateClient(client_dni: string, updateClientDto: UpdateClientDto): Promise<Client>;
    deleteClient(client_dni: string): Promise<void>;
    findAllClients(): Promise<Client[]>;
    findClientByDni(client_dni: string): Promise<Client>;
    findClientByName(client_name: string): Promise<Client>;
}
