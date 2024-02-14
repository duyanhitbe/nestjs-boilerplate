import { PaginationDto } from '@common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookInput } from '../dto/create-book.input';
import { UpdateBookByIdInput } from '../dto/update-book-by-id.input';

export const BookService = jest.fn().mockReturnValue({
	create: jest.fn((dto: CreateBookInput) => ({
		id: uuidv4(),
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	getAllPaginated: jest.fn((query: PaginationDto) => {
		const data = [
			{
				id: uuidv4(),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: uuidv4(),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];
		const limit = +(query.limit || 10);
		const page = +(query.page || 10);
		const offset = limit * (page - 1);
		const total = data.length;
		return {
			data: data.slice(offset, limit * page),
			pagination: {
				limit,
				page,
				total
			}
		};
	}),
	getOneByIdOrFail: jest.fn((id: string) => ({
		id,
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	softRemoveById: jest.fn((id: string) => ({
		id,
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	updateById: jest.fn((id: string, data: UpdateBookByIdInput) => ({
		...data,
		id,
		createdAt: new Date(),
		updatedAt: new Date()
	}))
});
