import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import * as bcrypt from 'bcrypt';

import { Role } from '../roles/role.entity';

@Entity({ name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true
  })
  email: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];

  @Exclude()
  @Column()
  password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password || this.password, 10)
  }
}

export class CreateUser {
  email: string;
  roles: Role[];
  password: string;
}

export class UpdateUser extends PartialType(CreateUser) {}