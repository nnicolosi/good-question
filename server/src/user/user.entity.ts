import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  @IsOptional()
  lastName: string;

  @Column()
  @IsBoolean()
  active: boolean;

  @Column()
  @IsBoolean()
  reset: boolean;
}
