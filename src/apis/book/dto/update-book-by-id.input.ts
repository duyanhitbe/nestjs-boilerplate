import { IsNotEmpty, IsString } from '@common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBookByIdInput {
	/** Name */
	@Field({ description: 'Name', nullable: true })
	@IsString()
	@IsNotEmpty()
	name?: string;
}
