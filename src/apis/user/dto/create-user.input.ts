import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field({ description: 'Tên đăng nhập' })
	@IsString()
	@IsNotEmpty()
	username!: string;

	@Field({ description: 'Mật khẩu đăng nhập' })
	@IsString()
	@IsNotEmpty()
	password!: string;
}
