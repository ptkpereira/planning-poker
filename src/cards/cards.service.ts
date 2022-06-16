import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    return await this.cardsRepository.save(
      this.cardsRepository.create(createCardDto),
    );
  }

  async findAll(query) {
    if (!query.limit) {
      query.limit = 10;
    }

    if (!query.offset) {
      query.offset = 0;
    }
    const cards = await this.cardsRepository
      .createQueryBuilder('card')
      .limit(query.limit)
      .offset(query.offset)
      .select(['card'])
      .getManyAndCount();

    return cards;
  }

  async findOne(id: string) {
    try {
      const card = await this.cardsRepository
        .createQueryBuilder('card')
        .where('card.id = :id', { id })
        .getOne();

      return card;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.cardsRepository.findOne({ where: { id } });

    this.cardsRepository.merge(card, updateCardDto);
    return await this.cardsRepository.save(card);
  }

  async remove(id: string) {
    return await this.cardsRepository.delete(id);
  }
}
