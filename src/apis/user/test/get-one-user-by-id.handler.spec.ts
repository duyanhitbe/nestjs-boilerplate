import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { GetOneUserByIdCommand } from '../commands/get-one-user-by-id.command';
import { GetOneUserByIdHandler } from '../handlers/get-one-user-by-id.handler';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';

jest.mock('../user.service');

describe('GetOneUserByIdHandler', () => {
	let handler: GetOneUserByIdHandler;
	let userService: IUserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetOneUserByIdHandler,
				{
					provide: IUserService,
					useClass: UserService
				}
			]
		}).compile();

		handler = module.get<GetOneUserByIdHandler>(GetOneUserByIdHandler);
		userService = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call userService.getOneByIdOrFail with the provided id', async () => {
		const data = new GetOneUserByIdCommand({
			id: uuidv4()
		});

		await handler.execute(data);

		expect(userService.getOneByIdOrFail).toHaveBeenCalledWith(data.id);
	});
});
