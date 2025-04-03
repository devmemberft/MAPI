import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-user.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
export declare class ClientsService {
    private clientRepository;
    constructor(clientRepository: Repository<Client>);
    createClient(createClientDto: CreateClientDto): Promise<Client>;
    updateClient(dni: number, updateClientDto: UpdateClientDto): Promise<Client>;
    deleteClient(dni: number): Promise<void>;
    findAllClients(): Promise<Client[]>;
    findClientByDni(dni: number): Promise<Client>;
}
