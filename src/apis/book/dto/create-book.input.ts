import { IsNotEmpty, IsString } from '@common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
	/** Name */
	@Field({ description: 'Name' })
	@IsString()
	@IsNotEmpty()
	name!: string;

	/** User's id */
	@Field({ description: `User's id` })
	@IsString()
	@IsNotEmpty()
	userId!: string;
}
