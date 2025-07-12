import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class KeyAuthService {
    private captchas = new Map<string,string>();
    constructor(private readonly userService:UserService,){}

    generateCaptcha(): {captcha_id:string; captcha_value:string}{
        const captcha_value = crypto.randomBytes(3).toString('hex'); // 6-char hex
        const captcha_id = crypto.randomUUID();
        this.captchas.set(captcha_id,captcha_value);

        setTimeout(() => this.captchas.delete(captcha_id), 5 * 60 * 1000); // TTL 5 min Time To Live o tiempo de vida
        return { captcha_id, captcha_value};
    }

    verifyCaptcha(captcha_id:string, captcha_input:string): boolean {
        const captcha_value = this.captchas.get(captcha_id);
        if(!captcha_value || captcha_value !== captcha_input) return false;
        this.captchas.delete(captcha_id);
        return true;
    }

    async registerNewAccessKeyUser():Promise< {access_key:string} >{
        const access_key = crypto.randomBytes(24).toString('hex');
        const user_secret_key_hashed = await bcrypt.hash(access_key,10);
        await this.userService.create({user_secret_key_hashed});
        return { access_key };
    }

    async loginUserAccessKey(access_key:string){
        const user = await this.userService.findByAccessKey(access_key);
        return user;
    }
}