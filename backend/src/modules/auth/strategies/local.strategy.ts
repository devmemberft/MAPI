import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService:AuthService) {
        super({usernameField:'username', passwordField:'password'});
    }

    async validate(id:string,username:string,password:string) {
        const user = await this.authService.validateUser(id,{username,password});

        if(!user) { throw new UnauthorizedException(); }

        return user;
    }
}