import { BaseEntity } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { IsNumber } from '../decorators/validation.decorator';

export class PaginationDto<T = BaseEntity> {
	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +(value || 10))
	@ApiProperty({ description: 'Số item mỗi trang', example: '10', type: 'string' })
	limit?: number;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +(value || 10))
	@ApiProperty({ description: 'Số trang hiện tại', example: '1', type: 'string' })
	page?: number;

	@IsOptional()
	@Transform(({ value }) => JSON.parse(value || '{}'))
	@ApiProperty({
		description: 'Sort theo field',
		example: '{ "createdAt": "ASC" }',
		type: 'string'
	})
	order?: FindOptionsOrder<T>;

	@IsOptional()
	@Transform(({ value }) => JSON.parse(value || '{}'))
	@ApiProperty({
		description: 'Filter theo field',
		example: '{ "name": "string" }',
		type: 'string'
	})
	filter?: FindOptionsWhere<T> | FindOptionsWhere<T>[];

	@IsOptional()
	@ApiProperty({ description: 'Tìm kiếm', example: '' })
	search?: string;
}
