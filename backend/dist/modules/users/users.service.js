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
    async updateUserProfile(id, updateUserDto) {
        const { username, email } = updateUserDto;
        const user = await this.findUserById(id);
        Object.assign(user, { ...updateUserDto, username, email });
        const updatedUser = await this.userRepository.save(user);
        return updatedUser;
    }
    async updateUserPassword(id, updateUserPasswordDto) {
        const { password } = updateUserPasswordDto;
        const user = await this.findUserById(id);
        const checkPassword = await this.bcryptService.comparePassword(password, user.password);
        if (checkPassword) {
            throw new common_1.ConflictException('New password must be different from old password.');
        }
        const hashedPassword = await this.bcryptService.hashPassword(password);
        user.password = hashedPassword;
        const updatedUser = await this.userRepository.save(user);
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await this.findUserById(id);
        await this.userRepository.remove(user);
    }
    async findAllUsers() {
        return this.userRepository.find({ select: ['user_id', 'username', 'email'], });
    }
    async findUserById(user_id) {
        const user = await this.userRepository.findOne({
            where: { user_id },
            select: ['user_id', 'username', 'email'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id: ${user_id} not found`);
        }
        return user;
    }
    async findUserByFilter(filter, page = 1, pageSize = 10) {
        const [users, total] = await this.userRepository.findAndCount({
            where: filter,
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: ['user_id', 'username', 'email'],
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
    async findUserByEmail(email) {
        const userEmail = await this.userRepository.findOne({ where: { email }, select: ['user_id', 'email', 'username',] });
        if (!userEmail) {
            throw new common_1.NotFoundException(`User with email ${email} not found.`);
        }
        return userEmail;
    }
    async findUserByName(username) {
        const user = await this.userRepository.findOne({ where: { username }, select: ['user_id', 'email', 'username',] });
        if (!user) {
            throw new common_1.NotFoundException(`${username} not found.`);
        }
        return user;
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