import { Test, TestingModule } from '@nestjs/testing';
import { Story } from './entities/story.entity';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

const storyList: Story[] = [
  new Story({ id: '1', description: 'Fix app' }),
  new Story({ id: '2', description: 'Develop feature' }),
  new Story({ id: '3', description: 'Develop app' }),
];

const newStory = new Story({ description: 'Fix app' });

const updatedStory = new Story({ description: 'Develop feature' });

describe('StoriesController', () => {
  let storyController: StoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoriesController],
      providers: [
        {
          provide: StoriesService,
          useValue: {
            create: jest.fn().mockResolvedValue(newStory),
            findAll: jest.fn().mockResolvedValue(storyList),
            findOne: jest.fn().mockResolvedValue(storyList[0]),
            update: jest.fn().mockResolvedValue(updatedStory),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    storyController = module.get<StoriesController>(StoriesController);
  });

  it('should be defined', () => {
    expect(storyController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new story', async () => {
      const newData = {
        description: 'Fix app',
      };
      const result = await storyController.create(newData);

      expect(result).toEqual(newStory);
    });
  });

  describe('findAll', () => {
    it('should get a array of stories', async () => {
      const result = await storyController.findAll({ query: { limit: '10' } });

      expect(result).toEqual(storyList);
    });
  });

  describe('findOne', () => {
    it('should get a single story', async () => {
      const result = await storyController.findOne('1');

      expect(result).toEqual(storyList[0]);
    });
  });

  describe('update', () => {
    it('should update a story', async () => {
      const updateData = {
        description: 'Develop feature',
      };

      const result = await storyController.update('1', updateData);

      expect(result).toEqual(updatedStory);
    });
  });

  describe('remove', () => {
    it('should delete a story', async () => {
      const result = await storyController.remove('1');

      expect(result).toBeNull;
    });
  });
});
