import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-user.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
export declare class ClientsService {
    private clientRepository;
    constructor(clientRepository: Repository<Client>);
    createClient(createClientDto: CreateClientDto): Promise<Client>;
    updateClient(client_dni: number, updateClientDto: UpdateClientDto): Promise<Client>;
    deleteClient(client_dni: number): Promise<void>;
    findAllClients(): Promise<Client[]>;
    findClientByDni(client_dni: number): Promise<Client>;
}
