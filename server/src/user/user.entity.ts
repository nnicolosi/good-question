import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsEnum(Role)
  role: Role;
}
