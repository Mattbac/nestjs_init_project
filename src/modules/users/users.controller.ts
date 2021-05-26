import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

import { Roles } from '../../decorator/roles.decorator';

import { User } from './user.entity';
import { UsersService } from './users.service';

@UseInterceptors(
  ClassSerializerInterceptor
)
@Roles('SUP_ADMIN')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get()
  findAll(@Query('filter') filter) {
    if (filter?.length > 0) {
      return this.usersService.search(filter);
    } else {
      return this.usersService.findAll();
    }
  }

  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles('ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
