import { translate } from '@app/modules/i18n/i18n.helper';
import { GetAllArgs, PaginationResponse } from '@common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsObject, IsOptional } from 'class-validator';
import JSON from 'graphql-type-json';
import { FilterQuery, SortOrder } from 'mongoose';
import { BookModel } from './models/book.model';

@ObjectType()
export class BookPaginated {
	@Field(() => [BookModel])
	data!: BookModel[];

	@Field(() => PaginationResponse)
	pagination!: PaginationResponse;
}

@InputType()
export class GetAllBookArgs extends GetAllArgs {
	@Field(() => JSON, { nullable: true })
	@IsOptional()
	@IsObject({ message: translate('validation.IS_JSON') })
	filter?: FilterQuery<BookModel>;

	@Field(() => JSON, { nullable: true })
	@IsOptional()
	@IsObject({ message: translate('validation.IS_JSON') })
	sort?: Record<string, SortOrder>;
}
