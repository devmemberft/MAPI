import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../jwt-payload.strategy";
import { Strategy, ExtractJwt } from 'passport-jwt' 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService:JwtService){
        super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey:(process.env.SECRET || 'secret')});
    }

    async validate(payload:JwtPayload){
        return { userId: payload.sub, username: payload.username };
    }

}