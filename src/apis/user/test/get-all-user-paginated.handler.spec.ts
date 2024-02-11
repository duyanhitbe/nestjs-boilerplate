import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUserPaginatedCommand } from '../commands/get-all-user-paginated.command';
import { GetAllUserPaginatedHandler } from '../handlers/get-all-user-paginated.handler';
import { IUserService } from '../user.interface';
import { UserService } from '../user.service';

jest.mock('../user.service');

describe('GetAllUserPaginatedHandler', () => {
	let handler: GetAllUserPaginatedHandler;
	let userService: IUserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetAllUserPaginatedHandler,
				{
					provide: IUserService,
					useClass: UserService
				}
			]
		}).compile();

		handler = module.get<GetAllUserPaginatedHandler>(GetAllUserPaginatedHandler);
		userService = module.get<IUserService>(IUserService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call userService.getAllPaginated with the provided query', async () => {
		const data = new GetAllUserPaginatedCommand({
			query: {
				limit: 10,
				page: 1
			}
		});

		await handler.execute(data);

		expect(userService.getAllPaginated).toHaveBeenCalledWith(data.query);
	});
});
