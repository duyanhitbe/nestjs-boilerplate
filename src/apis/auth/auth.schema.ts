import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
	@Field()
	accessToken!: string;

	@Field(() => Int)
	expiresIn!: number;
}
