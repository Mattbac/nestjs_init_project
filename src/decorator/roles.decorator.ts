import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/type/role-type';

export const Roles = (...roles: RoleType[]): any => SetMetadata('roles', roles);
