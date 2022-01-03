import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const userList = [
  [
    new User({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '@Bcd1234',
    }),
    new User({
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      password: '@Bcd1234',
    }),
    new User({
      name: 'Peter Doe',
      email: 'peterdoe@email.com',
      password: '@Bcd1234',
    }),
  ],
  3,
];

const updatedUser = new User({
  name: 'Jane Doe',
  email: 'janedoe@email.com',
  password: '5678',
});

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(userList[0]),
            create: jest.fn().mockResolvedValue(userList[0]),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            findOneOrFail: jest.fn().mockResolvedValue(userList[0]),
            merge: jest.fn().mockReturnValue(updatedUser),
            update: jest.fn().mockResolvedValue(updatedUser),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newData = {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '@Bcd1234',
      };
      const result = await userService.create(newData);

      expect(result).toEqual(userList[0]);
    });
  });

  describe('findAll', () => {
    it('should get a array of users', async () => {
      userRepository.createQueryBuilder = jest.fn(() => ({
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockReturnValueOnce(userList),
      }));
      const result = await userService.findAll({ query: { limit: '10' } });

      expect(result).toEqual(userList);
    });
  });

  describe('findOne', () => {
    it('should get a single user', async () => {
      userRepository.createQueryBuilder = jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(userList[0]),
      }));
      const result = await userService.findOne('1');

      expect(result).toEqual(userList[0]);
    });
  });

  describe('findOneByEmail', () => {
    it('should get a single user by email', async () => {
      const result = await userService.findOneByEmail('johndoe@email.com');

      expect(result).toEqual(userList[0]);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateData = {
        name: 'jane Doe',
        email: 'janedoe@email.com',
        password: '5678',
      };

      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);

      const result = await userService.update('1', updateData);

      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await userService.remove('1');

      expect(result).toBeNull;
    });
  });
});
