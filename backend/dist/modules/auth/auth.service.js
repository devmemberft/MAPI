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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
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
        const { username, email, password } = createUserDto;
        const userExists = await this.usersService.checkUsername(username);
        const emailExists = await this.usersService.checkEmail(email);
        if (userExists || emailExists) {
            throw new common_1.BadRequestException(`User credentials ${username && email} already exists.`);
        }
        const hashedPassword = await this.bcryptService.hashPassword(password);
        const user = await this.userRepository.save({ ...createUserDto, password: hashedPassword });
        return user;
    }
    async validateUser(loginUserDto) {
        const { id, email, password, role } = loginUserDto;
        const user = await this.usersService.findUserByEmail(email);
        const checkPassword = await this.bcryptService.comparePassword(password, user.password);
        if (!checkPassword) {
            throw new common_1.UnauthorizedException('Bad credentials.');
        }
        return user;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRATION || '5m' }),
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