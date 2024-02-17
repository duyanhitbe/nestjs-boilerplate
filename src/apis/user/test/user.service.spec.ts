import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../entities/user.entity';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';

const mockUserRepository = jest.fn(() => ({
	findOne: jest.fn(async (options: FindOptions<UserEntity>) => {
		if (
			options.where &&
			(options.where['username'] === 'user1' || options.where['id'] === '1')
		) {
			return null;
		}
		const password = '123';
		const hashedPassword = await hash(password);

		return {
			id: uuidv4(),
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			isActive: true,
			username: 'user',
			password: hashedPassword
		};
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
					provide: getRepositoryToken(UserEntity),
					useFactory: mockUserRepository
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
