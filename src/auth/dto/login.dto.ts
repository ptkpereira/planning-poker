import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from '../../helpers/messages.helper';
import { RegExHelper } from '../../helpers/regex.helper';

export class LoginDTO {
  /**
   * User email.
   * @example "johndoe@example.com"
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * User password for authentication.
   * @example "@Bcd1234"
   */
  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}

export class LoginBody {
  user: LoginDTO;
}
