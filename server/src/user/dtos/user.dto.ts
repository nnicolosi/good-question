import { Role } from 'src/common/enums/role.enum';

export class UserDto {
  id: number;
  username: string;
  role: Role;
  firstName: string;
  lastName: string;
  active: boolean;
  reset: boolean;
}
