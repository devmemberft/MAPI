"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("./entities/client.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ClientsService = class ClientsService {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async createClient(createClientDto) {
        const { dni } = createClientDto;
        const clientExists = await this.findClientByDni(dni);
        if (clientExists) {
            throw new common_1.BadRequestException(`User with dni: ${dni} already exists.`);
        }
        const client = await this.clientRepository.save(createClientDto);
        return client;
    }
    async updateClient(dni, updateClientDto) {
        const client = await this.findClientByDni(dni);
        Object.assign(client, updateClientDto);
        return this.clientRepository.save(client);
    }
    async deleteClient(dni) {
        const client = await this.findClientByDni(dni);
        await this.clientRepository.delete(client);
    }
    async findAllClients() {
        return await this.clientRepository.find();
    }
    async findClientByDni(dni) {
        const client = await this.clientRepository.findOneBy({ dni });
        if (!client) {
            throw new common_1.NotFoundException(`User with dni: ${dni} not found.`);
        }
        return client;
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map