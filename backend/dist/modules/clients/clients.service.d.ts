import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
export declare class ClientsService {
    private clientRepository;
    constructor(clientRepository: Repository<Client>);
    createClient(createClientDto: CreateClientDto): Promise<Client>;
    updateClient(client_dni: string, updateClientDto: UpdateClientDto): Promise<Client>;
    deleteClient(client_dni: string): Promise<void>;
    findAllClients(): Promise<Client[]>;
    findClientByDni(client_dni: string): Promise<Client>;
    checkDuplication(client_dni: string): Promise<Client | null>;
    findClientByName(client_name: string): Promise<Client>;
}
