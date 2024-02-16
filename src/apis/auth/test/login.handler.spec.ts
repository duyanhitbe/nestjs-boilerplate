import { IJwtService, JwtService } from '@modules/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { LoginCommand } from '../commands/login.command';
import { LoginHandler } from '../handlers/login.handler';

jest.mock('../../user/user.service');
jest.mock('../../../modules/jwt/jwt.service');

describe('LoginHandler', () => {
	let handler: LoginHandler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LoginHandler,
				{
					provide: IJwtService,
					useClass: JwtService
				}
			]
		}).compile();

		handler = module.get<LoginHandler>(LoginHandler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should return accessToken and expiresIn', async () => {
		const user = { id: uuidv4() } as User;
		const loginCommand = new LoginCommand({ user });
		const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60;
		const loginData = await handler.execute(loginCommand);
		expect(loginData.accessToken).toBeDefined();
		expect(loginData.expiresIn).toEqual(expiresIn);
	});
});
