import { Card } from '../../cards/entities/card.entity';
import { Story } from '../../stories/entities/story.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Card)
  card: Card;

  @ManyToOne(() => Story, (story) => story.votes)
  story: Story;

  constructor(vote?: Partial<Vote>) {
    this.id = vote?.id;
    this.user = vote?.user;
    this.card = vote?.card;
    this.story = vote?.story;
  }
}
