import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { translate } from 'src/modules/i18n/i18n.helper';

@ObjectType()
export class PaginationResponse {
	@Field(() => Int)
	limit: number = 10;

	@Field(() => Int)
	page: number = 1;

	@Field(() => Int)
	total!: number;
}

@InputType({ isAbstract: true })
export class GetAllArgs {
	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber({}, { message: translate('validation.IS_NUMBER') })
	limit: number = 10;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber({}, { message: translate('validation.IS_NUMBER') })
	page: number = 1;

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: translate('validation.IS_STRING') })
	search?: string;
}
