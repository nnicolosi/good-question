import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
