import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

@Entity({ name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true
  })
  email: string;

  @Exclude()
  @Column()
  password: string;
}

export class CreateUser {
  email: string;
  password: string;
}

export class UpdateUser extends PartialType(CreateUser) {}