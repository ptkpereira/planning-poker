import { Test, TestingModule } from '@nestjs/testing';
import { Vote } from './entities/vote.entity';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { UserInterface } from '../users/users.interface';
import { CardInterface } from '../cards/cards.interface';
import { StoryInterface } from '../stories/stories.interface';

const user: UserInterface = {
  id: '1',
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
  hashPassword: () => '@Bcd1234',
  votes: [],
};

const card: CardInterface = {
  id: '1',
  value: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const story: StoryInterface = {
  id: '1',
  description: 'Fix',
  createdAt: new Date(),
  updatedAt: new Date(),
  votes: [],
};

const voteList: Vote[] = [
  new Vote({ id: '1', user, card, story }),
  new Vote({ id: '2', user, card, story }),
  new Vote({ id: '3', user, card, story }),
];

const newVote = new Vote({ id: '1', user, card, story });

const updatedVote = new Vote({ id: '2', user, card, story });

describe('VotesController', () => {
  let voteController: VotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotesController],
      providers: [
        {
          provide: VotesService,
          useValue: {
            create: jest.fn().mockResolvedValue(newVote),
            findAll: jest.fn().mockResolvedValue(voteList),
            findOne: jest.fn().mockResolvedValue(voteList[0]),
            update: jest.fn().mockResolvedValue(updatedVote),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    voteController = module.get<VotesController>(VotesController);
  });

  it('should be defined', () => {
    expect(voteController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vote', async () => {
      const newData = {
        user,
        card,
        story,
      };
      const result = await voteController.create(newData);

      expect(result).toEqual(newVote);
    });
  });

  describe('findAll', () => {
    it('should get a array of votes', async () => {
      const result = await voteController.findAll({ query: { limit: '10' } });

      expect(result).toEqual(voteList);
    });
  });

  describe('findOne', () => {
    it('should get a single vote', async () => {
      const result = await voteController.findOne('1');

      expect(result).toEqual(voteList[0]);
    });
  });

  describe('update', () => {
    it('should update a vote', async () => {
      const updateData = {
        user,
        card,
        story,
      };

      const result = await voteController.update('1', updateData);

      expect(result).toEqual(updatedVote);
    });
  });

  describe('remove', () => {
    it('should delete a vote', async () => {
      const result = await voteController.remove('1');

      expect(result).toBeNull;
    });
  });
});
