import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserByIdInput {
	@Field({ description: 'Tên đăng nhập', nullable: true })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	username?: string;
}
