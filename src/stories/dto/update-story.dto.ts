import { PartialType } from '@nestjs/mapped-types';
import { CreateStoryDto } from './create-story.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateStoryDto extends PartialType(CreateStoryDto) {
  /**
   * Feature explanation.
   * @example "5"
   */
  @IsNotEmpty()
  description: string;
}
