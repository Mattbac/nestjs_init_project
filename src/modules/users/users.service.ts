import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUser, UpdateUser, User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUser) {
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  search(filter: Array<any>) {
    let query = this.usersRepository.createQueryBuilder();
    filter.forEach( (item, index) => {
      const where = `${item.column} ${item.operator} :value`;
      const value = (item.operator === 'like') ? `%${item.value}%` : `${item.value}`;
      if (index < 0) {
        query.where(where, { value });
      } else {
        query.andWhere(where, { value });
      }
    });
    return query.getMany();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  searchOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async update(id: number, user: UpdateUser) {
    this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
