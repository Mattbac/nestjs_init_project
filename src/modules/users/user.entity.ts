import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

import { RoleType } from 'src/type/role-type';

@Entity({ name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar'
  })
  role: RoleType;

  @Exclude()
  @Column()
  password: string;
}

export class CreateUser {
  email: string;
  role: RoleType;
  password: string;
}

export class UpdateUser extends PartialType(CreateUser) {}