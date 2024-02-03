import { IsNotEmpty, IsString } from '@common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
	/** Tài khoản đăng nhập */
	@Field({ description: 'Tài khoản đăng nhập' })
	@IsString()
	@IsNotEmpty()
	username!: string;

	/** Mật khẩu */
	@Field({ description: 'Mật khẩu' })
	@IsString()
	@IsNotEmpty()
	password!: string;
}
