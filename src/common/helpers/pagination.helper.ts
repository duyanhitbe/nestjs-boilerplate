import { PaginationDto } from '../base/base.dto';

export function paginationHelper<T>(
	array: T[],
	paginationDto: PaginationDto
): IPaginationResponse<T> {
	const limit = +(paginationDto.limit || 10);
	const page = +(paginationDto.page || 1);
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	return {
		data: array.slice(startIndex, endIndex),
		pagination: {
			limit,
			page,
			total: array.length
		}
	};
}
