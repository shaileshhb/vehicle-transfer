import { IsAlpha, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  lastName: string;

  @IsEmail({},{
    message: "Invalid email specified. Email should be of type example@domain.com"
  })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
