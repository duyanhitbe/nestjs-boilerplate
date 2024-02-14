import { GetAllArgs, PaginationResponse } from '@common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsObject, IsOptional } from 'class-validator';
import JSON from 'graphql-type-json';
import { translate } from 'src/modules/i18n/i18n.helper';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { BookEntity } from './entities/book.entity';

@ObjectType()
export class BookPaginated {
	@Field(() => [BookEntity])
	data!: BookEntity[];

	@Field(() => PaginationResponse)
	pagination!: PaginationResponse;
}

@InputType()
export class GetAllBookArgs extends GetAllArgs {
	@Field(() => JSON, { nullable: true })
	@IsOptional()
	@IsObject({ message: translate('validation.IS_JSON') })
	filter?: FindOptionsWhere<BookEntity> | FindOptionsWhere<BookEntity>[];

	@Field(() => JSON, { nullable: true })
	@IsOptional()
	@IsObject({ message: translate('validation.IS_JSON') })
	order?: FindOptionsOrder<BookEntity>;
}
