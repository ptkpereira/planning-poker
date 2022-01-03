import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';
import { Vote } from './entities/vote.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from '../users/users.interface';
import { CardInterface } from '../cards/cards.interface';
import { StoryInterface } from '../stories/stories.interface';

const user: UserInterface = {
  id: '1',
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '@Bcd1234',
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

const voteList = [
  [
    new Vote({ user, card, story }),
    new Vote({ user, card, story }),
    new Vote({ user, card, story }),
  ],
  3,
];

const updatedVote = new Vote({ user, card, story });

describe('VotesService', () => {
  let voteService: VotesService;
  let voteRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        {
          provide: getRepositoryToken(Vote),
          useValue: {
            save: jest.fn().mockResolvedValue(voteList[0]),
            create: jest.fn().mockResolvedValue(voteList[0]),
            findOne: jest.fn().mockResolvedValue(voteList[0]),
            merge: jest.fn().mockReturnValue(updatedVote),
            update: jest.fn().mockResolvedValue(updatedVote),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    voteService = module.get<VotesService>(VotesService);
    voteRepository = module.get<Repository<Vote>>(getRepositoryToken(Vote));
  });

  it('should be defined', () => {
    expect(voteService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vote', async () => {
      const newData = {
        user,
        card,
        story,
      };
      const result = await voteService.create(newData);

      expect(result).toEqual(voteList[0]);
    });
  });

  describe('findAll', () => {
    it('should get a array of votes', async () => {
      voteRepository.createQueryBuilder = jest.fn(() => ({
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockReturnValueOnce(voteList),
      }));
      const result = await voteService.findAll({ query: { limit: '10' } });

      expect(result).toEqual(voteList);
    });
  });

  describe('findOne', () => {
    it('should get a single vote', async () => {
      voteRepository.createQueryBuilder = jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(voteList[0]),
      }));
      const result = await voteService.findOne('1');

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

      jest.spyOn(voteRepository, 'save').mockResolvedValue(updatedVote);

      const result = await voteService.update('1', updateData);

      expect(result).toEqual(updatedVote);
    });
  });

  describe('remove', () => {
    it('should delete a vote', async () => {
      const result = await voteService.remove('1');

      expect(result).toBeNull;
    });
  });
});
