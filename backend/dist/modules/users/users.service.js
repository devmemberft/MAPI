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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hash_service_1 = require("../auth/hash.service");
let UsersService = class UsersService {
    userRepository;
    bcryptService;
    constructor(userRepository, bcryptService) {
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async updateUser(id, updateUserDto) {
        const user = await this.findUserById(id);
        Object.assign(user, updateUserDto);
        await this.userRepository.save(user);
        const showUpdatedUser = await this.findUserById(id);
        return showUpdatedUser;
    }
    async deleteUser(id) {
        const user = await this.findUserById(id);
        await this.userRepository.remove(user);
    }
    async findAllUsers() {
        return this.userRepository.find({ select: ['id', 'username', 'email'], });
    }
    async findUserById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'username', 'email'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id: ${id} not found`);
        }
        return user;
    }
    async findUserByFilter(filter, page = 1, pageSize = 10) {
        const [users, total] = await this.userRepository.findAndCount({
            where: filter,
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: ['id', 'username', 'email'],
        });
        if (users.length === 0) {
            throw new common_1.NotFoundException(`User with filter: ${JSON.stringify(filter)} not found`);
        }
        return users;
    }
    async checkUsername(username) {
        const user = await this.userRepository.findOneBy({ username });
        if (user) {
            return true;
        }
        return false;
    }
    async checkEmail(email) {
        const mail = await this.userRepository.findOneBy({ email });
        if (mail) {
            return true;
        }
        return false;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hash_service_1.BcryptService])
], UsersService);
//# sourceMappingURL=users.service.js.map