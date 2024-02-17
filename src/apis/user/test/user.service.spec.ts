import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models/user.model';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';
import { FilterQuery } from 'mongoose';

const mockUserModel = jest.fn(() => ({
	findOne: jest.fn((filter: FilterQuery<UserModel>) => {
		const user = {
			id: uuidv4(),
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			isActive: true,
			username: 'user'
		};
		if (filter) {
			if (filter['username'] === 'user1') {
				user.username = 'user1';
			}
			if (filter['id'] === '1' || filter['_id'] === '1') {
				user.id = '1';
			}
		}

		const result = {
			sort: (sort) => result,
			select: (select) => result,
			populate: (populate) => result,
			exec: async () => {
				if (user.username === 'user1' || user.id === '1') {
					return null;
				}
				const password = '123';
				const hashedPassword = await hash(password);
				user['password'] = hashedPassword;
				return user;
			}
		};

		return result;
	})
}));

describe('UserService', () => {
	let service: IUserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IUserService,
					useClass: UserService
				},
				{
					provide: getModelToken(UserModel.name),
					useFactory: mockUserModel
				}
			]
		}).compile();

		service = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('validateUserByUsernamePassword', () => {
		it('should throw UnauthorizedException when user not found', async () => {
			await expect(
				service.validateUserByUsernamePassword('user1', 'password')
			).rejects.toThrow(UnauthorizedException);
		});
		it('should throw UnauthorizedException when wrong password', async () => {
			await expect(
				service.validateUserByUsernamePassword('user2', 'password')
			).rejects.toThrow(UnauthorizedException);
		});
		it('should return an user', async () => {
			const user = await service.validateUserByUsernamePassword('user2', '123');
			expect(user.id).toBeDefined();
			expect(user.createdAt).toBeDefined();
			expect(user.updatedAt).toBeDefined();
			expect(user.deletedAt).toEqual(null);
			expect(user.isActive).toBeDefined();
		});
	});

	describe('validateUserById', () => {
		it('should throw NotFoundException when user not found', async () => {
			await expect(service.validateUserById('1')).rejects.toThrow(NotFoundException);
		});
		it('should return an user', async () => {
			const user = await service.validateUserById('2');
			expect(user.id).toBeDefined();
			expect(user.createdAt).toBeDefined();
			expect(user.updatedAt).toBeDefined();
			expect(user.deletedAt).toEqual(null);
			expect(user.isActive).toBeDefined();
		});
	});
});
