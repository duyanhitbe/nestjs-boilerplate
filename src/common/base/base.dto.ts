import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { FilterQuery, SortOrder } from 'mongoose';
import { IsNumber } from '../decorators/validation.decorator';

export class PaginationDto {
	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +(value || 10))
	@ApiProperty({ description: 'Số item mỗi trang', example: '10' })
	limit?: number;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +(value || 1))
	@ApiProperty({ description: 'Số trang hiện tại', example: '1' })
	page?: number;

	@IsOptional()
	@Transform(({ value }) => JSON.parse(value || '{}'))
	@ApiProperty({ description: 'Sort theo field', example: '{ "createdAt": "ASC" }' })
	sort?: Record<string, SortOrder>;

	@IsOptional()
	@Transform(({ value }) => JSON.parse(value || '{}'))
	@ApiProperty({ description: 'Filter theo field', example: '{ "name": "string" }' })
	filter?: FilterQuery<any>;

	@IsOptional()
	@ApiProperty({ description: 'Tìm kiếm', example: '' })
	search?: string;
}

export class IPagination {
	/** Số item trong một trang */
	@Expose()
	limit!: number;
	/** Số trang hiện tại */
	@Expose()
	page!: number;
	/** Tổng số lượng item */
	@Expose()
	total!: number;
}

export class BaseResponse {
	/** ObjectId */
	@ApiProperty({ description: 'ObjectId' })
	@Expose()
	id!: string;

	/** Ngày tạo */
	@ApiProperty({ description: 'Ngày tạo' })
	@Expose()
	createdAt!: Date;

	/** Lần cuối update */
	@ApiProperty({ description: 'Lần cuối update' })
	@Expose()
	updatedAt!: Date;

	/** Ngày xoá */
	@ApiProperty({ description: 'Ngày xoá' })
	@Expose()
	deletedAt?: Date;

	/** Kích hoạt */
	@ApiProperty({ description: 'Kích hoạt' })
	@Expose()
	isActive!: boolean;
}
