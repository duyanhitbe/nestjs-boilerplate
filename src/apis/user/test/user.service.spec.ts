import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from '../models/user.model';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';

const mockUserModel = jest.fn().mockReturnValue({});

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
					useValue: mockUserModel
				}
			]
		}).compile();

		service = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
