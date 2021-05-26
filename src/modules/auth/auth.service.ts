import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { RoleType } from '../../type/role-type';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(
        userLogin: {
            username: string,
            password: string
        }) {
        const user = await this.usersService.searchOne(userLogin.username);
        if ( !user ) return { error: "Invalid username or password!" };

        const same = await bcrypt.compare( userLogin.password, user.password );
        if (!same) {
            return { error: "Invalid username or password!" };
        }

        return {
            access_token: this.jwtService.sign({
                id: user.id,
                username: user.email,
                authorities: user.roles.map(role => role.name)
            }),
        };
    }
}