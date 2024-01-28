import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { IUserHandler } from '../user.interface';
import { UserHandler } from '../user.handler';

jest.mock('../user.handler');

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: IUserHandler,
					useClass: UserHandler
				}
			]
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
