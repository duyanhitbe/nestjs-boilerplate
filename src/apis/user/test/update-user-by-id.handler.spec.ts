import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserByIdCommand } from '../commands/update-user-by-id.command';
import { UpdateUserByIdHandler } from '../handlers/update-user-by-id.handler';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';

jest.mock('../user.service');

describe('UpdateUserByIdHandler', () => {
	let handler: UpdateUserByIdHandler;
	let userService: IUserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateUserByIdHandler,
				{
					provide: IUserService,
					useClass: UserService
				}
			]
		}).compile();

		handler = module.get<UpdateUserByIdHandler>(UpdateUserByIdHandler);
		userService = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call userService.create with the provided data', async () => {
		const mockUpdateUserByIdCommand = new UpdateUserByIdCommand({
			id: uuidv4(),
			data: {
				username: 'username',
				password: 'password'
			}
		});

		await handler.execute(mockUpdateUserByIdCommand);
		const { id, data } = mockUpdateUserByIdCommand;

		expect(userService.updateById).toHaveBeenCalledWith(id, data);
	});
});
