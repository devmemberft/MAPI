import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../jwt-payload.strategy";
import { Strategy, ExtractJwt } from 'passport-jwt' 
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService:AuthService){
        super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey:(process.env.SECRET || 'secret')});
    }

    async validate(payload:JwtPayload){
        return { userId: payload.sub, email: payload.email };
    }

}