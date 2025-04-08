import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator";
@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
    constructor(private reflector:Reflector){super(); }

    canActivate(context:ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]> (Roles, context.getHandler());
        if(!requiredRoles) { return true } // si no hay roles cualquiera puede ingresar.

        const request = context.switchToHttp().getRequest();
        const user = request.user; // el usuario se obtiene del jwt
        
        return requiredRoles.some(role => user.roles?.includes(role));
    }
} 