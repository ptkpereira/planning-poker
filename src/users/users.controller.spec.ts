import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const userList: User[] = [
  new User({
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '@Bcd1234',
  }),
  new User({
    id: '2',
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    password: '@Bcd1234',
  }),
  new User({
    id: '3',
    name: 'Peter Doe',
    email: 'peterdoe@example.com',
    password: '@Bcd1234',
  }),
];

const newUser = new User({
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '@Bcd1234',
});

const updatedUser = new User({
  name: 'Jane Doe',
  email: 'janedoe@example.com',
  password: '5678',
});

describe('UsersController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUser),
            findAll: jest.fn().mockResolvedValue(userList),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            update: jest.fn().mockResolvedValue(updatedUser),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '@Bcd1234',
      };
      const result = await userController.create(newData);

      expect(result).toEqual(newUser);
    });
  });

  describe('findAll', () => {
    it('should get a array of users', async () => {
      const result = await userController.findAll({ query: { limit: '10' } });

      expect(result).toEqual(userList);
    });
  });

  describe('findOne', () => {
    it('should get a single user', async () => {
      const result = await userController.findOne('1');

      expect(result).toEqual(userList[0]);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateData = {
        name: 'jane Doe',
        email: 'janedoe@example.com',
        password: '5678',
      };

      const result = await userController.update('1', updateData);

      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await userController.remove('1');

      expect(result).toBeNull;
    });
  });
});
