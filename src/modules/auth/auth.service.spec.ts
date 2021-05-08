import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  
  beforeEach(async () => {
    jwtService = new JwtService({});
    usersService = new UsersService(null);

    service = new AuthService(usersService, jwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an assess token', async () => {

      jest.spyOn(usersService, 'searchOne').mockImplementation(() => new Promise((resolve, reject) => resolve({
        id: 1,
        email: 'toto',
        password: '$2b$10$qXytSvQ5jIOCTPL548QR6.4JtqBv2rsdwChaHmUJGuZP1/gL8apwm',
      })));

      jest.spyOn(jwtService, 'sign').mockImplementation(() => "qsdfqsd");

      expect(await service.login({
        username: 'toto',
        password: 'secret'
      })).toStrictEqual({
        access_token: "qsdfqsd"
      });
    });

    it('should throw an error', async () => {
      jest.spyOn(usersService, 'searchOne').mockImplementation(() => new Promise((resolve, reject) => resolve({
        id: 1,
        email: 'toto',
        password: '$2b$10$qXytSvQ5jIOCTPL548QR6.4JtqBv2rsdwChaHmUJGuZP1/gL8apwm',
      })));

      jest.spyOn(jwtService, 'sign').mockImplementation(() => "qsdfqsd");

      expect(await service.login({
        username: 'toto',
        password: 'wrong_password'
      })).toStrictEqual({
        error: "Invalid username or password!" }
      );
    });

    it('should throw an error', async () => {
      jest.spyOn(usersService, 'searchOne').mockImplementation(() => new Promise((resolve, reject) => resolve(null)));

      expect(await service.login({
        username: 'toto',
        password: 'wrong_password'
      })).toStrictEqual({
        error: "Invalid username or password!" }
      );
    });
  });

});
