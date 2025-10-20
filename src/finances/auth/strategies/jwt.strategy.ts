import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.strategy";
import { Strategy, ExtractJwt } from 'passport-jwt' 
import { Request } from "express";

import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req?.cookies['access_token'],]), ignoreExpiration:false, secretOrKey:(process.env.JWT_SECRET || 'secret')});
    }

    async validate(payload:JwtPayload){
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }

}