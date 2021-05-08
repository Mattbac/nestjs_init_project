import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        let rolesTemp = [];
        let roles = this.reflector.get<string[]>('roles', context.getHandler()); // Get function decorator
        if (!!roles) roles.forEach(item => rolesTemp.push(item));
        roles = this.reflector.get<string[]>('roles', context.getClass()); // Get class decorator
        if (!!roles) roles.forEach(item => rolesTemp.push(item));

        let roleSet = new Set<string>(rolesTemp);
        if (roleSet.size === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        return request.user && request.user.authorities && request.user.authorities.some(role => roleSet.has(role));
    }
}
