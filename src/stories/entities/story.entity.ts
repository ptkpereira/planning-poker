import { Vote } from '../../votes/entities/vote.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Vote, (vote) => vote.story)
  votes: Vote[];

  constructor(story?: Partial<Story>) {
    this.id = story?.id;
    this.description = story?.description;
    this.createdAt = story?.createdAt;
    this.updatedAt = story?.updatedAt;
  }
}
