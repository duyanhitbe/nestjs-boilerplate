import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../mocks/user.repository';

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
					useFactory: UserRepository
				}
			]
		}).compile();

		service = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
