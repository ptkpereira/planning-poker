import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    return await this.votesRepository.save(
      this.votesRepository.create(createVoteDto),
    );
  }

  async findAll(query) {
    if (!query.limit) {
      query.limit = 10;
    }

    if (!query.offset) {
      query.offset = 0;
    }

    const votes = this.votesRepository
      .createQueryBuilder('vote')
      .limit(query.limit)
      .offset(query.offset)
      .leftJoinAndSelect('vote.user', 'user')
      .leftJoinAndSelect('vote.card', 'card')
      .leftJoinAndSelect('vote.story', 'story')
      .select([
        'vote',
        'user.id',
        'user.name',
        'card.id',
        'card.value',
        'story.id',
        'story.description',
      ])
      .getManyAndCount();

    return votes;
  }

  async findOne(id: string) {
    try {
      const vote = await this.votesRepository
        .createQueryBuilder('vote')
        .where('vote.id = :id', { id })
        .leftJoinAndSelect('vote.user', 'user')
        .select(['vote', 'user.id', 'user.name'])
        .getOne();

      return vote;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateVoteDto: UpdateVoteDto) {
    const vote = await this.votesRepository.findOne({ where: { id } });

    this.votesRepository.merge(vote, updateVoteDto);
    return await this.votesRepository.save(vote);
  }

  async remove(id: string) {
    return await this.votesRepository.delete(id);
  }
}
