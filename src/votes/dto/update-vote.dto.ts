import { PartialType } from '@nestjs/mapped-types';
import { CardInterface } from '../../cards/cards.interface';
import { StoryInterface } from '../../stories/stories.interface';
import { UserInterface } from '../../users/users.interface';
import { CreateVoteDto } from './create-vote.dto';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {
  /**
   * User ID of who is voting.
   * @example "72a7132e-0cca-4f99-a0ca-0745e24ca1ab"
   */
  user: UserInterface;

  /**
   * Card ID with value chosen by the user.
   * @example "662644f9-f10b-43b3-9544-21727e761d0e"
   */
  card: CardInterface;

  /**
   * Story ID on vote.
   * @example "dd632570-db2a-44b3-8dea-9c806f3dd74e"
   */
  story: StoryInterface;
}
