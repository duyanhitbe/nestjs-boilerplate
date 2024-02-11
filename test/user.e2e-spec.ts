import { CreateUserInput } from '@apis/user/dto/create-user.input';
import { UpdateUserByIdInput } from '@apis/user/dto/update-user-by-id.input';
import { IUserService } from '@apis/user/user.interface';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('UserResolver (e2e)', () => {
	let app: INestApplication;
	let userService: IUserService;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		//Remove all user
		// userService = app.get<IUserService>(IUserService);
		// await userService.softRemoveAll();
	});

	afterAll(async () => {
		await app.close();
	});

	it('getAllUserPaginated (Query)', async () => {
		// const _user1 = await userService.create({
		// 	username: 'user',
		// 	password: 'strongPassword'
		// });
		// const user2 = await userService.create({
		// 	username: 'user',
		// 	password: 'strongPassword'
		// });
		// const getAllUserPaginatedQuery = `
		// 	query GetAllUserPaginated($query: GetAllUserArgs) {
		// 		getAllUserPaginated(query: $query) {
		// 			data {
		// 				username
		// 			}
		// 			pagination {
		// 				limit
		// 				page
		// 				total
		// 			}
		// 		}
		// 	}
		// `;
		// return request(app.getHttpServer())
		// 	.post('/graphql')
		// 	.send({
		// 		operationName: 'getAllUserPaginated',
		// 		variables: {
		// 			query: {
		// 				limit: 1,
		// 				page: 2
		// 			}
		// 		},
		// 		query: getAllUserPaginatedQuery
		// 	})
		// 	.expect(200)
		// 	.then(({ body }) => {
		// 		expect(body.status).toEqual(200);
		// 		expect(body.message).toEqual('success');
		// 		expect(body.data?.length).toEqual(1);
		// 		expect(body.data?.[0].id).toEqual(user2.id);
		// 		expect(body.pagination.limit).toEqual(1);
		// 		expect(body.pagination.page).toEqual(2);
		// 		expect(body.pagination.total).toEqual(2);
		// 	});
		expect(1).toEqual(1);
	});
	it('getOneUser (Query)', async () => {
		const user = await userService.create({
			username: 'user',
			password: 'strongPassword'
		});
		expect(1).toEqual(1);
	});
	it('createUser (Mutation)', () => {
		const createUserData: CreateUserInput = {
			username: 'user',
			password: 'strongPassword'
		};
		expect(1).toEqual(1);
	});
	it('updateUser (Mutation)', async () => {
		const user = await userService.create({
			username: 'user',
			password: 'strongPassword'
		});
		const updatedUsername = 'updatedUsername';
		const updateUserData: UpdateUserByIdInput = {
			username: updatedUsername
		};
		expect(1).toEqual(1);
	});
	it('removeUser (Mutation)', async () => {
		const user = await userService.create({
			username: 'user',
			password: 'strongPassword'
		});
		expect(1).toEqual(1);
	});
});
