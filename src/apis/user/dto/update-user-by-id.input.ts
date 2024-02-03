import { IsNotEmpty, IsString } from '@common';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateUserByIdInput {
	@Field({ description: 'Tên đăng nhập', nullable: true })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	username?: string;
}
