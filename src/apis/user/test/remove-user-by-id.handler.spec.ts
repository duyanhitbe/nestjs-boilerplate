import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { RemoveUserByIdCommand } from '../commands/remove-user-by-id.command';
import { RemoveUserByIdHandler } from '../handlers/remove-user-by-id.handler';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';

jest.mock('../user.service');

describe('RemoveUserByIdHandler', () => {
	let handler: RemoveUserByIdHandler;
	let userService: IUserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RemoveUserByIdHandler,
				{
					provide: IUserService,
					useClass: UserService
				}
			]
		}).compile();

		handler = module.get<RemoveUserByIdHandler>(RemoveUserByIdHandler);
		userService = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call userService.softRemoveById with the provided id', async () => {
		const data = new RemoveUserByIdCommand({
			id: uuidv4()
		});

		await handler.execute(data);

		expect(userService.softRemoveById).toHaveBeenCalledWith(data.id);
	});
});
