import { IsNotEmpty } from 'class-validator';
export class CreateCardDto {
  /**
   * Estimated value of story points.
   * @example "5"
   */
  @IsNotEmpty()
  value: string;
}
