import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService:AuthService) {
        super({usernameField:'username', passwordField:'password'});
    }  
 
    async validate(user_id:string,email:string,password:string, role:string) {
        const user = await this.authService.login({user_id,email,password,role});

        if(!user) { throw new UnauthorizedException('checkpoint'); }

        return user;
    }
}