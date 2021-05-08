import { Controller, Get, Request, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { Public } from '../../decorator/public.decorator';
import { Roles } from '../../decorator/roles.decorator';

import { AuthService } from './auth.service';

import { RoleType } from '../../type/role-type';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Public()
    @Post('login')
    async login(@Res() res, @Body() user) {
        const result = await this.authService.login(user);
        return res.status(result.hasOwnProperty('error') ? HttpStatus.UNAUTHORIZED : HttpStatus.OK).json(result);
    }

    @Roles(RoleType.ADMIN)
    @Get('get-me')
    async getme(@Request() req) {
        return {
            id: req.user.id,
            username: req.user.username,
            authorities: req.user.authorities
        };
    }
}
