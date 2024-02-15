import { CreateUserInput } from '@apis/user/dto/create-user.input';
import { UpdateUserByIdInput } from '@apis/user/dto/update-user-by-id.input';
import { IUserService } from '@apis/user/user.interface';
import { AppModule } from '@app/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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
		userService = app.get<IUserService>(IUserService);
		await userService.softRemoveAll();
	});

	afterAll(async () => {
		await userService.softRemoveAll();
		await app.close();
	});

	it('getAllUserPaginated (Query)', async () => {
		const user1 = await userService.create({
			username: 'user',
			password: 'password'
		});
		const user2 = await userService.create({
			username: 'user',
			password: 'password'
		});
		const getAllUserPaginatedQuery = `
			query GetAllUserPaginated($query: GetAllUserArgs) {
				getAllUserPaginated(query: $query) {
					data {
						id
						createdAt
						updatedAt
						deletedAt
						isActive
						username
					}
					pagination {
						limit
						page
						total
					}
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					query: {
						limit: 1,
						page: 1,
						order: {
							createdAt: 'ASC'
						}
					}
				},
				query: getAllUserPaginatedQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { getAllUserPaginated }
					}
				}) => {
					expect(getAllUserPaginated.data?.length).toEqual(1);
					expect(getAllUserPaginated.data?.[0].id).toEqual(user1.id);
					expect(getAllUserPaginated.pagination.limit).toEqual(1);
					expect(getAllUserPaginated.pagination.page).toEqual(1);
					expect(getAllUserPaginated.pagination.total).toEqual(2);
				}
			);
	});
	it('getOneUser (Query)', async () => {
		const user = await userService.create({
			username: 'user',
			password: 'password'
		});
		const getOneUserQuery = `
			query GetOneUser($getOneUserId: String!) {
				getOneUser(id: $getOneUserId) {
					id
					createdAt
					updatedAt
					deletedAt
					isActive
					username
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					getOneUserId: user.id
				},
				query: getOneUserQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { getOneUser }
					}
				}) => {
					expect(getOneUser?.id).toEqual(user.id);
				}
			);
	});
	it('createUser (Mutation)', () => {
		const createUserData: CreateUserInput = {
			username: 'user',
			password: 'password'
		};
		const createUserQuery = `
			mutation CreateUser($data: CreateUserInput!) {
				createUser(data: $data) {
					id
					createdAt
					updatedAt
					deletedAt
					isActive
					username
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					data: createUserData
				},
				query: createUserQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { createUser }
					}
				}) => {
					expect(createUser?.id).toBeDefined();
					expect(createUser?.createdAt).toBeDefined();
					expect(createUser?.updatedAt).toBeDefined();
					expect(createUser?.deletedAt).toBeDefined();
					expect(createUser?.isActive).toBeDefined();
					expect(createUser?.username).toBeDefined();
				}
			);
	});
	it('updateUser (Mutation)', async () => {
		const user = await userService.create({
			username: 'user',
			password: 'password'
		});
		const updatedUserName = 'updatedUserName';
		const updateUserData: UpdateUserByIdInput = {
			username: updatedUserName
		};
		const updateUserQuery = `
			mutation UpdateUser($updateUserId: String!, $data: UpdateUserByIdInput) {
				updateUser(id: $updateUserId, data: $data) {
					id
					createdAt
					updatedAt
					deletedAt
					isActive
					username
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					updateUserId: user.id,
					data: updateUserData
				},
				query: updateUserQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { updateUser }
					}
				}) => {
					expect(updateUser?.id).toBeDefined();
					expect(updateUser?.createdAt).toBeDefined();
					expect(updateUser?.updatedAt).toBeDefined();
					expect(updateUser?.deletedAt).toBeDefined();
					expect(updateUser?.isActive).toBeDefined();
					expect(updateUser?.username).toEqual(updatedUserName);
				}
			);
	});
	it('removeUser (Mutation)', async () => {
		const user = await userService.create({
			username: 'user',
			password: 'password'
		});
		const removeUserQuery = `
			mutation RemoveUser($removeUserId: String!) {
				removeUser(id: $removeUserId) {
					id
					createdAt
					updatedAt
					deletedAt
					isActive
					username
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					removeUserId: user.id
				},
				query: removeUserQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { removeUser }
					}
				}) => {
					expect(removeUser?.id).toBeDefined();
					expect(removeUser?.createdAt).toBeDefined();
					expect(removeUser?.updatedAt).toBeDefined();
					expect(removeUser?.deletedAt).toBeDefined();
					expect(removeUser?.isActive).toBeDefined();
					expect(removeUser?.username).toBeDefined();
				}
			);
	});
});
