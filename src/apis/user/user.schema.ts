import { translate } from '@app/modules/i18n/i18n.helper';
import { GetAllArgs, PaginationResponse } from '@common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsObject, IsOptional } from 'class-validator';
import JSON from 'graphql-type-json';
import { FilterQuery, SortOrder } from 'mongoose';
import { UserModel } from './models/user.model';

@ObjectType()
export class UserPaginated {
	@Field(() => [UserModel])
	data!: UserModel[];

	@Field(() => PaginationResponse)
	pagination!: PaginationResponse;
}

@InputType()
export class GetAllUserArgs extends GetAllArgs {
	@Field(() => JSON, { nullable: true })
	@IsOptional()
	@IsObject({ message: translate('validation.IS_JSON') })
	filter?: FilterQuery<UserModel>;

	@Field(() => JSON, { nullable: true })
	@IsOptional()
	@IsObject({ message: translate('validation.IS_JSON') })
	sort?: Record<string, SortOrder>;
}
