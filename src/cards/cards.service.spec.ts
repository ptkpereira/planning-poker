import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const cardList = [
  [
    new Card({ value: '1' }),
    new Card({ value: '2' }),
    new Card({ value: '4' }),
  ],
  3,
];

const updatedCard = new Card({ value: '2' });

describe('CardsService', () => {
  let cardService: CardsService;
  let cardRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Card),
          useValue: {
            save: jest.fn().mockResolvedValue(cardList[0]),
            create: jest.fn().mockResolvedValue(cardList[0]),
            findOne: jest.fn().mockResolvedValue(cardList[0]),
            merge: jest.fn().mockReturnValue(updatedCard),
            update: jest.fn().mockResolvedValue(updatedCard),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    cardService = module.get<CardsService>(CardsService);
    cardRepository = module.get<Repository<Card>>(getRepositoryToken(Card));
  });

  it('should be defined', () => {
    expect(cardService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new card', async () => {
      const newData = {
        value: '1',
      };
      const result = await cardService.create(newData);

      expect(result).toEqual(cardList[0]);
    });
  });

  describe('findAll', () => {
    it('should get a array of cards', async () => {
      cardRepository.createQueryBuilder = jest.fn(() => ({
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockReturnValueOnce(cardList),
      }));
      const result = await cardService.findAll({ query: { limit: '10' } });

      expect(result).toEqual(cardList);
    });
  });

  describe('findOne', () => {
    it('should get a single card', async () => {
      cardRepository.createQueryBuilder = jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(cardList[0]),
      }));
      const result = await cardService.findOne('1');

      expect(result).toEqual(cardList[0]);
    });
  });

  describe('update', () => {
    it('should update a card', async () => {
      const updateData = {
        value: '2',
      };

      jest.spyOn(cardRepository, 'save').mockResolvedValue(updatedCard);

      const result = await cardService.update('1', updateData);

      expect(result).toEqual(updatedCard);
    });
  });

  describe('remove', () => {
    it('should delete a card', async () => {
      const result = await cardService.remove('1');

      expect(result).toBeNull;
    });
  });
});
