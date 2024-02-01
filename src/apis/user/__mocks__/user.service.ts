import { PaginationDto } from '@common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserByIdDto } from '../dto/update-user-by-id.dto';

export const UserService = jest.fn().mockReturnValue({
	create: jest.fn((dto: CreateUserDto) => ({
		id: uuidv4(),
		username: dto.username,
		password: dto.password,
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	getAllPaginated: jest.fn((query: PaginationDto) => {
		const data = [
			{
				id: uuidv4(),
				username: 'user1',
				password: 'password1',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: uuidv4(),
				username: 'user2',
				password: 'password2',
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
		username: 'username',
		password: 'password',
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	softRemoveById: jest.fn((id: string) => ({
		id,
		username: 'username',
		password: 'password',
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	updateById: jest.fn((id: string, data: UpdateUserByIdDto) => ({
		...data,
		id,
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	validateUserByUsernamePassword: jest.fn((username: string, password: string) => ({
		id: uuidv4(),
		username,
		password,
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	validateUserById: jest.fn((id: string) => ({
		id,
		username: 'username',
		password: 'password',
		createdAt: new Date(),
		updatedAt: new Date()
	}))
});
