import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';

const mockUserRepository = jest.fn().mockReturnValue({});

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
					useValue: mockUserRepository
				}
			]
		}).compile();

		service = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
