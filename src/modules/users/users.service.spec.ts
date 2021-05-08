import { createConnection, getConnection, getRepository, QueryFailedError, Repository } from 'typeorm';

import { UsersService } from './users.service';

import { UpdateUser, User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>
  
  let user1: User = {
    id: 1,
    email: 'user1@create.fr',
    password: 'secret'
  };

  const user2: User = {
    id: 2,
    email: 'user2@create.fr',
    password: 'secret'
  };

  beforeEach(async () => {
    await createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [
        User
      ],
      synchronize: true,
      logging: false
    });

    repository = await getRepository(User);
    service = new UsersService(repository);

    await repository.insert(user1);
  });

  afterEach(() => {
    let conn = getConnection();
    return conn.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    expect((await service.create(user2)).id).toStrictEqual(2);
  });

  it('should throw a unique constraint', async () => {
    await expect(service.create({
      email: 'user1@create.fr',
      password: 'secret'
    })).rejects.toThrow(QueryFailedError);
  });

  it('should find all users', async () => {
    await repository.insert(user2);
    expect(await service.findAll()).toHaveLength(2);
  });

  it('should find the user with email: user2@create.fr', async () => {
    await repository.insert(user2);
    expect(await service.search([{
      column: 'email',
      operator: '=',
      value: 'user2@create.fr'
    }])).toEqual([user2]);
  });

  it('should find the user with email: user2@create.fr', async () => {
    await repository.insert(user2);
    expect(await service.searchOne(user1.email)).toEqual(user1);
  });

  it('should find one', async () => {
    await repository.insert(user2);
    expect(await service.findOne(user1.id)).toEqual(user1);
  });

  it('should update the email of user1', async () => {
    const toUpdate: UpdateUser = {
      email: 'email@update.fr'
    };
    expect(await service.update(user1.id, toUpdate)).toEqual(
      {
        ...user1,
        ...toUpdate
      }
    );
  });

  it('should delete user 1', async () => {
    await repository.insert(user2);
    expect((await repository.find()).length).toBe(2);
    await service.remove(user1.id);
    expect((await repository.find()).length).toBe(1);
  });

});
