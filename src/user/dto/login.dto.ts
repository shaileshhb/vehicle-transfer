import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsEmail({},{
    message: "Invalid email specified. Email should be of type example@domain.com"
  })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
