import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService:AuthService) {
        super({usernameField:'username', passwordField:'password'});
    }  
 
    async validate(id:string,email:string,password:string, role:string) {
        const user = await this.authService.validateUser({id,email,password,role});

        if(!user) { throw new UnauthorizedException('checkpoing'); }

        return user;
    }
}