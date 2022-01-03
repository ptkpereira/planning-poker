import { Test, TestingModule } from '@nestjs/testing';
import { StoriesService } from './stories.service';
import { Story } from './entities/story.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const storyList = [
  [
    new Story({ description: 'Fix app' }),
    new Story({ description: 'Develop feature' }),
    new Story({ description: 'Develop app' }),
  ],
  3,
];

const updatedStory = new Story({ description: 'Develop feature' });

describe('StoriesService', () => {
  let storyService: StoriesService;
  let storyRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesService,
        {
          provide: getRepositoryToken(Story),
          useValue: {
            save: jest.fn().mockResolvedValue(storyList[0]),
            create: jest.fn().mockResolvedValue(storyList[0]),
            findOne: jest.fn().mockResolvedValue(storyList[0]),
            merge: jest.fn().mockReturnValue(updatedStory),
            update: jest.fn().mockResolvedValue(updatedStory),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    storyService = module.get<StoriesService>(StoriesService);
    storyRepository = module.get<Repository<Story>>(getRepositoryToken(Story));
  });

  it('should be defined', () => {
    expect(storyService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new story', async () => {
      const newData = {
        description: 'Fix app',
      };
      const result = await storyService.create(newData);

      expect(result).toEqual(storyList[0]);
    });
  });

  describe('findAll', () => {
    it('should get a array of stories', async () => {
      storyRepository.createQueryBuilder = jest.fn(() => ({
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockReturnValueOnce(storyList),
      }));
      const result = await storyService.findAll({ query: { limit: '10' } });

      expect(result).toEqual(storyList);
    });
  });

  describe('findOne', () => {
    it('should get a single story', async () => {
      storyRepository.createQueryBuilder = jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(storyList[0]),
      }));
      const result = await storyService.findOne('1');

      expect(result).toEqual(storyList[0]);
    });
  });

  describe('update', () => {
    it('should update a story', async () => {
      const updateData = {
        description: 'Develop feature',
      };

      jest.spyOn(storyRepository, 'save').mockResolvedValue(updatedStory);

      const result = await storyService.update('1', updateData);

      expect(result).toEqual(updatedStory);
    });
  });

  describe('remove', () => {
    it('should delete a story', async () => {
      const result = await storyService.remove('1');

      expect(result).toBeNull;
    });
  });
});
