import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  /**
   * Task complexity value.
   * @example "5"
   */
  @IsNotEmpty()
  value: string;
}
