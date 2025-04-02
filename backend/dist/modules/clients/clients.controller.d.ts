import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-user.dto';
import { Client } from './entities/client.entity';
export declare class ClientsController {
    private clientsService;
    constructor(clientsService: ClientsService);
    createClient(createClientDto: CreateClientDto): Promise<Client>;
    updateClient(dni: number, updateClientDto: UpdateClientDto): Promise<Client>;
    deleteClient(dni: number): Promise<void>;
    findAllClients(): Promise<Client[]>;
    findClientByDni(dni: number): Promise<Client>;
}
