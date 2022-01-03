import { IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  /**
   * Feature explanation.
   * @example "5"
   */
  @IsNotEmpty()
  description: string;
}
