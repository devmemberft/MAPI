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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
const hash_service_1 = require("./hash.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const dotenv = require("dotenv");
dotenv.config();
let AuthService = class AuthService {
    userRepository;
    usersService;
    jwtService;
    bcryptService;
    constructor(userRepository, usersService, jwtService, bcryptService) {
        this.userRepository = userRepository;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.bcryptService = bcryptService;
    }
    async register(createUserDto) {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(create_user_dto_1.CreateUserDto, createUserDto);
        const error = await (0, class_validator_1.validate)(dtoInstance);
        if (error.length > 0) {
            throw new common_1.BadRequestException('Format is not correct.');
        }
        const userExists = await this.usersService.checkUsername(createUserDto.username);
        const emailExists = await this.usersService.checkEmail(createUserDto.email);
        if (userExists || emailExists) {
            throw new common_1.BadRequestException(`User credentials ${createUserDto.username} and ${createUserDto.email} already exists.`);
        }
        const hashedPassword = await this.bcryptService.hashPassword(createUserDto.password);
        const user = await this.userRepository.save({ ...createUserDto, password: hashedPassword });
        const { password, ...cleanUser } = user;
        return cleanUser;
    }
    async validateUser(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.usersService.findUserByEmail(email);
        const checkPassword = await this.bcryptService.comparePassword(password, user.password);
        if (!checkPassword) {
            throw new common_1.UnauthorizedException('Bad credentials.');
        }
        return user;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.user_id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRATION }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        jwt_1.JwtService,
        hash_service_1.BcryptService])
], AuthService);
//# sourceMappingURL=auth.service.js.map