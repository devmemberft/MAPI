import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { User } from "../users/user.entity";
import { JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv'
import { JwtPayload } from "jsonwebtoken";
dotenv.config();

@Injectable()
export class KeyAuthService {
    private captchas = new Map<string,string>();
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService,){}

    generateCaptcha(): {captcha_id:string; captcha_value:string}{
        const captcha_value = crypto.randomBytes(3).toString('hex'); // 6-
        // char hex
        const captcha_id = crypto.randomUUID();
        this.captchas.set(captcha_id,captcha_value);

        setTimeout(() => this.captchas.delete(captcha_id), 5 * 60 * 1000); // TTL 5 min Time To Live o tiempo de vida
        return { captcha_id, captcha_value };
    }

    verifyCaptcha(captcha_input:string): boolean {
        const captcha_value = this.captchas.get(captcha_input);
        if(!captcha_value || captcha_value !== captcha_input) return false;
        this.captchas.delete(captcha_input);
        return true;
    }

    async generateFormattedKey():Promise<string>{
        const raw_access_key = crypto.randomBytes(10).toString('hex').toUpperCase();
        if(raw_access_key.length != 20) { throw new Error(`Key was not correctly generated. `); }
        const formatted_access_key = raw_access_key.match(/.{1,4}/g)!.join('-'); // agrupar cada 4 y unir con un guion pero .match nunca debe fallar y siempre se deben generar 20 chars keys
        return formatted_access_key;
    }

    async registerNewAccessKeyUser():Promise< {access_key:string} >{
        const access_key = await this.generateFormattedKey();
        const user_secret_key_hashed = await bcrypt.hash(access_key,10);
        await this.userService.create({user_secret_key_hashed});
        return { access_key };
    }

    async generateJwt(user:User):Promise<string>{
        const payload:JwtPayload = { sub: user.user_id, secret:process.env.JWT_SECRET, expiresIn:process.env.JWT_EXPIRATION};
        const access_token = this.jwtService.signAsync(payload); 
        return access_token;
    }

    async loginUserAccessKey(access_key:string){
        const user = await this.userService.findValidUserByAccessKey(access_key);
        return user;
    }

}