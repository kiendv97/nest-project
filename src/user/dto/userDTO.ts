import { IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
  readonly username: string;
  readonly email: string;
  readonly bio: string;
  readonly image: string;
}

// export class ? 
export class CreateUserDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}