import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private storiesRepository: Repository<Story>,
  ) {}

  async create(createStoryDto: CreateStoryDto) {
    return await this.storiesRepository.save(
      this.storiesRepository.create(createStoryDto),
    );
  }

  async findAll(query) {
    if (!query.limit) {
      query.limit = 10;
    }

    if (!query.offset) {
      query.offset = 0;
    }

    const stories = await this.storiesRepository
      .createQueryBuilder('story')
      .limit(query.limit)
      .offset(query.offset)
      .select(['story'])
      .getManyAndCount();

    return stories;
  }

  async findOne(id: string) {
    try {
      const story = await this.storiesRepository
        .createQueryBuilder('story')
        .where('story.id = :id', { id })
        .getOne();

      return story;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateStoryDto: UpdateStoryDto) {
    const story = await this.storiesRepository.findOne(id);

    this.storiesRepository.merge(story, updateStoryDto);
    return await this.storiesRepository.save(story);
  }

  async remove(id: string) {
    return await this.storiesRepository.delete(id);
  }
}
