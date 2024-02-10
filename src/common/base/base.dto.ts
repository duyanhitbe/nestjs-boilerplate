import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';
import { FilterQuery } from 'mongoose';
import { BaseModel } from './base.model';

export class PaginationDto {
	@IsOptional()
	@IsNumberString()
	@ApiProperty({ description: 'Số item mỗi trang', example: '10' })
	limit?: string;

	@IsOptional()
	@IsNumberString()
	@ApiProperty({ description: 'Số trang hiện tại', example: '1' })
	page?: string;

	@IsOptional()
	@ApiProperty({ description: 'Sort theo field', example: '{ "createdAt": "ASC" }' })
	sort?: string;

	@IsOptional()
	@ApiProperty({ description: 'Filter theo field', example: '{ "name": "string" }' })
	filter?: string;

	@IsOptional()
	@ApiProperty({ description: 'Tìm kiếm', example: '' })
	search?: string;
}

export class GetAllQueryDto<T = any> extends OmitType(PaginationDto, ['limit', 'page']) {
	where?: FilterQuery<T>;
}

export class IResponse<T extends BaseModel> {
	/** Response status code */
	status!: number;
	/** Thông báo */
	message!: string;
	/** Dữ liệu */
	data!: T;
	/** Dữ liệu phân trang */
	pagination?: {
		/** Số item trong một trang */
		limit: number;
		/** Số trang hiện tại */
		page: number;
		/** Tổng số lượng item */
		total: number;
	};
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

export class IPaginationResponse<T> {
	/** Mảng các items */
	@Expose()
	data!: T[];

	@Expose()
	pagination!: IPagination;
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
