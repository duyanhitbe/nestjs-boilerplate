import { IUserService } from '@apis/user/user.interface';
import { UserService } from '@apis/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from '../auth.interface';
import { AuthService } from '../auth.service';

jest.mock('../../user/user.service');

describe('AuthService', () => {
	let service: IAuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IAuthService,
					useClass: AuthService
				},
				{
					provide: IUserService,
					useClass: UserService
				}
			]
		}).compile();

		service = module.get<IAuthService>(IAuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getService', () => {
		it('should return valid instance', async () => {
			const instance = service.getService('user');
			expect(instance.validateUserById).toBeDefined();
			expect(instance.validateUserByUsernamePassword).toBeDefined();
		});
	});
});
