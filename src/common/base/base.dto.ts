import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { FindOptionsWhere } from 'typeorm';

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
	where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
}
