import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommand } from '../commands/create-user.command';
import { CreateUserHandler } from '../handlers/create-user.handler';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';

jest.mock('../user.service');

describe('CreateUserHandler', () => {
	let handler: CreateUserHandler;
	let userService: IUserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateUserHandler,
				{
					provide: IUserService,
					useClass: UserService
				}
			]
		}).compile();

		handler = module.get<CreateUserHandler>(CreateUserHandler);
		userService = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call userService.create with the provided data', async () => {
		const mockCreateUserCommand = new CreateUserCommand({
			data: {
				username: 'username',
				password: 'password'
			}
		});

		await handler.execute(mockCreateUserCommand);
		const { data } = mockCreateUserCommand;

		expect(userService.create).toHaveBeenCalledWith(data);
	});
});
