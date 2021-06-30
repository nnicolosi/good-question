import { IsNotEmpty } from 'class-validator';

export class SetPasswordDto {
	@IsNotEmpty()
	password: string;
}