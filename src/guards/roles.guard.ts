import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        let roles = this.reflector.getAllAndMerge<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        let roleSet = new Set<string>(roles);
        if (roleSet.size === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        return request.user && request.user.authorities && request.user.authorities.some(role => roleSet.has(role));
    }
}
