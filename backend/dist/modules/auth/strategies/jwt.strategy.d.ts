import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../jwt-payload.strategy";
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private jwtService;
    constructor(jwtService: JwtService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        username: string;
    }>;
}
export {};
