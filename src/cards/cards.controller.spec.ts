import { Test, TestingModule } from '@nestjs/testing';
import { Card } from './entities/card.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

const cardList: Card[] = [
  new Card({ id: '1', value: '1' }),
  new Card({ id: '2', value: '2' }),
  new Card({ id: '3', value: '4' }),
];

const newCard = new Card({ value: '1' });

const updatedCard = new Card({ value: '2' });

describe('CardsController', () => {
  let cardController: CardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: {
            create: jest.fn().mockResolvedValue(newCard),
            findAll: jest.fn().mockResolvedValue(cardList),
            findOne: jest.fn().mockResolvedValue(cardList[0]),
            update: jest.fn().mockResolvedValue(updatedCard),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    cardController = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(cardController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new card', async () => {
      const newData = {
        value: '1',
      };
      const result = await cardController.create(newData);

      expect(result).toEqual(newCard);
    });
  });

  describe('findAll', () => {
    it('should get a array of cards', async () => {
      const result = await cardController.findAll({ query: { limit: '10' } });

      expect(result).toEqual(cardList);
    });
  });

  describe('findOne', () => {
    it('should get a single card', async () => {
      const result = await cardController.findOne('1');

      expect(result).toEqual(cardList[0]);
    });
  });

  describe('update', () => {
    it('should update a card', async () => {
      const updateData = {
        value: '2',
      };

      const result = await cardController.update('1', updateData);

      expect(result).toEqual(updatedCard);
    });
  });

  describe('remove', () => {
    it('should delete a card', async () => {
      const result = await cardController.remove('1');

      expect(result).toBeNull;
    });
  });
});
