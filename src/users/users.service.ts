import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  async findAll(query) {
    if (!query.limit) {
      query.limit = 10;
    }

    if (!query.offset) {
      query.offset = 0;
    }

    const users = await this.usersRepository
      .createQueryBuilder('user')
      .limit(query.limit)
      .offset(query.offset)
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.createdAt',
        'user.updatedAt',
      ])
      .getManyAndCount();

    return users;
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .leftJoinAndSelect('user.votes', 'vote')
        .select([
          'user.id',
          'user.name',
          'user.email',
          'user.createdAt',
          'user.updatedAt',
          'vote.id',
        ])
        .getOne();

      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.usersRepository.findOneOrFail({ email });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }
}
