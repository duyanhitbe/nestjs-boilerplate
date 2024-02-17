import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { set } from 'lodash';
import { DeepPartial, Entity, FindManyOptions, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../base.entity';
import { BaseService } from '../base.service';

@Entity({ name: 'test' })
class TestEntity extends BaseEntity {
	constructor() {
		super();
		const now = new Date();
		this.id = uuidv4();
		this.createdAt = now;
		this.updatedAt = now;
		this.deletedAt = null;
		this.isActive = true;
	}

	async save() {
		return this;
	}
}

@Injectable()
class TestService extends BaseService<TestEntity> {
	notFoundMessage: string = 'Not found entity';

	constructor(@InjectRepository(TestEntity) private readonly testRepo: Repository<TestEntity>) {
		super(testRepo);
	}
}

const mockTestRepository = jest.fn(() => ({
	create: jest.fn((data: DeepPartial<TestEntity>) => new TestEntity()),
	findOne: jest.fn((options: FindOptions<TestEntity>) => {
		if (options.where && options.where['id'] === '1') {
			return null;
		}
		return new TestEntity();
	}),
	find: jest.fn(() => [new TestEntity()]),
	findAndCount: jest.fn((options?: FindManyOptions<TestEntity> | undefined) => {
		const entities = [new TestEntity(), new TestEntity()];
		const take = options?.take;
		const skip = options?.skip || 0;

		if (take) {
			const cloneEntities = entities.slice(skip, take * (skip + 1));
			return [cloneEntities, cloneEntities.length];
		}

		return [entities, entities.length];
	}),
	remove: jest.fn(() => new TestEntity()),
	delete: jest.fn(() =>
		Promise.resolve({
			raw: [],
			affected: 2
		})
	),
	softRemove: jest.fn((entity) => entity),
	softDelete: jest.fn(() =>
		Promise.resolve({
			raw: [],
			affected: 2
		})
	),
	count: jest.fn(() => Promise.resolve(2)),
	createQueryBuilder: jest.fn((alias: string) => ({})),
	increment: jest.fn(() =>
		Promise.resolve({
			raw: [],
			affected: 2,
			generatedMaps: []
		})
	),
	decrement: jest.fn(() =>
		Promise.resolve({
			raw: [],
			affected: 2,
			generatedMaps: []
		})
	),
	query: jest.fn(() => Promise.resolve([]))
}));

describe('BaseService', () => {
	let service: TestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TestService,
				{
					provide: getRepositoryToken(TestEntity),
					useFactory: mockTestRepository
				}
			]
		}).compile();

		service = module.get<TestService>(TestService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create new entity', async () => {
			const entity = await service.create({});
			expect(entity.id).toBeDefined();
			expect(entity.createdAt).toBeDefined();
			expect(entity.updatedAt).toBeDefined();
			expect(entity.deletedAt).toBeDefined();
			expect(entity.isActive).toBeDefined();
		});
	});

	describe('createMany', () => {
		it('should create a new list of entity', async () => {
			const entities = await service.createMany([{}, {}]);
			for (const entity of entities) {
				expect(entity.id).toBeDefined();
				expect(entity.createdAt).toBeDefined();
				expect(entity.updatedAt).toBeDefined();
				expect(entity.deletedAt).toBeDefined();
				expect(entity.isActive).toBeDefined();
			}
		});
	});

	describe('getOne', () => {
		it('should return null', async () => {
			const entity = await service.getOne({
				where: { id: '1' }
			});
			expect(entity).toEqual(null);
		});
		it('should return entity', async () => {
			const entity = await service.getOne({
				where: { id: '2' }
			});
			expect(entity?.id).toBeDefined();
			expect(entity?.createdAt).toBeDefined();
			expect(entity?.updatedAt).toBeDefined();
			expect(entity?.deletedAt).toBeDefined();
			expect(entity?.isActive).toBeDefined();
		});
	});

	describe('getOneOrFail', () => {
		it('should throw NotFoundException', async () => {
			await expect(
				service.getOneOrFail({
					where: { id: '1' }
				})
			).rejects.toThrow(NotFoundException);
		});
		it('should return entity', async () => {
			const entity = await service.getOneOrFail({
				where: { id: '2' }
			});
			expect(entity?.id).toBeDefined();
			expect(entity?.createdAt).toBeDefined();
			expect(entity?.updatedAt).toBeDefined();
			expect(entity?.deletedAt).toBeDefined();
			expect(entity?.isActive).toBeDefined();
		});
	});

	describe('getOneById', () => {
		it('should return null', async () => {
			const entity = await service.getOneById('1');
			expect(entity).toEqual(null);
		});
		it('should return entity', async () => {
			const entity = await service.getOneById('2');
			expect(entity?.id).toBeDefined();
			expect(entity?.createdAt).toBeDefined();
			expect(entity?.updatedAt).toBeDefined();
			expect(entity?.deletedAt).toBeDefined();
			expect(entity?.isActive).toBeDefined();
		});
	});

	describe('getOneByIdOrFail', () => {
		it('should throw NotFoundException', async () => {
			await expect(service.getOneByIdOrFail('1')).rejects.toThrow(NotFoundException);
		});
		it('should return entity', async () => {
			const entity = await service.getOneByIdOrFail('2');
			expect(entity?.id).toBeDefined();
			expect(entity?.createdAt).toBeDefined();
			expect(entity?.updatedAt).toBeDefined();
			expect(entity?.deletedAt).toBeDefined();
			expect(entity?.isActive).toBeDefined();
		});
	});

	describe('getOneOrCreate', () => {
		it('should throw InternalServerErrorException', async () => {
			await expect(
				service.getOneOrCreate({
					where: {
						id: '1'
					}
				})
			).rejects.toThrow(InternalServerErrorException);
		});
		it('should create new entity', async () => {
			const data = {};
			const entity = await service.getOneOrCreate(
				{
					where: {
						id: '1'
					}
				},
				data
			);
			expect(entity?.id).toBeDefined();
			expect(entity?.createdAt).toBeDefined();
			expect(entity?.updatedAt).toBeDefined();
			expect(entity?.deletedAt).toBeDefined();
			expect(entity?.isActive).toBeDefined();
		});
		it('should return already entity', async () => {
			const entity = await service.getOneOrCreate({
				where: {
					id: '2'
				}
			});
			expect(entity?.id).toBeDefined();
			expect(entity?.createdAt).toBeDefined();
			expect(entity?.updatedAt).toBeDefined();
			expect(entity?.deletedAt).toBeDefined();
			expect(entity?.isActive).toBeDefined();
		});
	});

	describe('getAll', () => {
		it('should return list of entity', async () => {
			const entities = await service.getAll({});
			for (const entity of entities) {
				expect(entity.id).toBeDefined();
				expect(entity.createdAt).toBeDefined();
				expect(entity.updatedAt).toBeDefined();
				expect(entity.deletedAt).toBeDefined();
				expect(entity.isActive).toBeDefined();
			}
		});
	});

	describe('getAllPaginated', () => {
		it('should return 1 entity', async () => {
			const { data, pagination } = await service.getAllPaginated({
				limit: 1,
				page: 1
			});
			expect(data.length).toEqual(1);
			for (const entity of data) {
				expect(entity.id).toBeDefined();
				expect(entity.createdAt).toBeDefined();
				expect(entity.updatedAt).toBeDefined();
				expect(entity.deletedAt).toBeDefined();
				expect(entity.isActive).toBeDefined();
			}
			expect(pagination.limit).toEqual(1);
			expect(pagination.page).toEqual(1);
			expect(pagination.total).toEqual(1);
		});
		it('should return multiple entities', async () => {
			const { data, pagination } = await service.getAllPaginated({
				limit: -1
			});
			expect(data.length).toBeGreaterThan(1);
			for (const entity of data) {
				expect(entity.id).toBeDefined();
				expect(entity.createdAt).toBeDefined();
				expect(entity.updatedAt).toBeDefined();
				expect(entity.deletedAt).toBeDefined();
				expect(entity.isActive).toBeDefined();
			}
			expect(pagination.limit).toEqual(data.length);
			expect(pagination.page).toEqual(1);
			expect(pagination.total).toEqual(data.length);
		});
	});

	describe('update', () => {
		const options = {};
		const data = {
			id: '123'
		};
		beforeEach(() => {
			set(options, 'where.id', '1');
		});
		it('should throw NotFoundException', async () => {
			await expect(service.update(options, data)).rejects.toThrow(NotFoundException);
		});
		it('should update entity', async () => {
			set(options, 'where.id', '2');
			const updatedEntity = await service.update(options, data);
			expect(updatedEntity.id).toBeDefined();
			expect(updatedEntity.id).toEqual(data.id);
			expect(updatedEntity.createdAt).toBeDefined();
			expect(updatedEntity.updatedAt).toBeDefined();
			expect(updatedEntity.deletedAt).toBeDefined();
			expect(updatedEntity.isActive).toBeDefined();
		});
	});
	describe('updateById', () => {
		const data = {
			id: '123'
		};
		it('should throw NotFoundException', async () => {
			await expect(service.updateById('1', data)).rejects.toThrow(NotFoundException);
		});
		it('should update entity', async () => {
			const updatedEntity = await service.updateById('2', data);
			expect(updatedEntity.id).toBeDefined();
			expect(updatedEntity.id).toEqual(data.id);
			expect(updatedEntity.createdAt).toBeDefined();
			expect(updatedEntity.updatedAt).toBeDefined();
			expect(updatedEntity.deletedAt).toBeDefined();
			expect(updatedEntity.isActive).toBeDefined();
		});
	});
	describe('remove', () => {
		const options = {};
		beforeEach(() => {
			set(options, 'where.id', '1');
		});
		it('should throw NotFoundException', async () => {
			await expect(service.remove(options)).rejects.toThrow(NotFoundException);
		});
		it('should return entity', async () => {
			set(options, 'where.id', '2');
			const updatedEntity = await service.remove(options);
			expect(updatedEntity.id).toBeDefined();
			expect(updatedEntity.createdAt).toBeDefined();
			expect(updatedEntity.updatedAt).toBeDefined();
			expect(updatedEntity.deletedAt).toBeDefined();
			expect(updatedEntity.isActive).toBeDefined();
		});
	});
	describe('removeById', () => {
		it('should throw NotFoundException', async () => {
			await expect(service.removeById('1')).rejects.toThrow(NotFoundException);
		});
		it('should return entity', async () => {
			const updatedEntity = await service.removeById('2');
			expect(updatedEntity.id).toBeDefined();
			expect(updatedEntity.createdAt).toBeDefined();
			expect(updatedEntity.updatedAt).toBeDefined();
			expect(updatedEntity.deletedAt).toBeDefined();
			expect(updatedEntity.isActive).toBeDefined();
		});
	});
	describe('removeAll', () => {
		it('should return DeleteResult', async () => {
			const deletedResult = await service.removeAll();
			expect(deletedResult.raw).toBeDefined();
			expect(deletedResult.affected).toBeDefined();
			expect(deletedResult.affected).toEqual(2);
		});
	});
	describe('softRemove', () => {
		const options = {};
		beforeEach(() => {
			set(options, 'where.id', '1');
		});
		it('should throw NotFoundException', async () => {
			await expect(service.softRemove(options)).rejects.toThrow(NotFoundException);
		});
		it('should return entity', async () => {
			set(options, 'where.id', '2');
			const updatedEntity = await service.softRemove(options);
			expect(updatedEntity.id).toBeDefined();
			expect(updatedEntity.createdAt).toBeDefined();
			expect(updatedEntity.updatedAt).toBeDefined();
			expect(updatedEntity.deletedAt).toBeDefined();
			expect(updatedEntity.isActive).toBeDefined();
		});
	});
	describe('softRemoveById', () => {
		it('should throw NotFoundException', async () => {
			await expect(service.softRemoveById('1')).rejects.toThrow(NotFoundException);
		});
		it('should return entity', async () => {
			const updatedEntity = await service.softRemoveById('2');
			expect(updatedEntity.id).toBeDefined();
			expect(updatedEntity.createdAt).toBeDefined();
			expect(updatedEntity.updatedAt).toBeDefined();
			expect(updatedEntity.deletedAt).toBeDefined();
			expect(updatedEntity.isActive).toBeDefined();
		});
	});
	describe('softRemoveAll', () => {
		it('should return DeleteResult', async () => {
			const deletedResult = await service.softRemoveAll();
			expect(deletedResult.raw).toBeDefined();
			expect(deletedResult.affected).toBeDefined();
			expect(deletedResult.affected).toEqual(2);
		});
	});
	describe('count', () => {
		it('should return result', async () => {
			const result = await service.count({});
			expect(result).toEqual(2);
		});
	});
	describe('getQueryBuilder', () => {
		it('should return QueryBuilder', async () => {
			const queryBuilder = await service.getQueryBuilder('test');
			expect(queryBuilder).toBeDefined();
		});
	});
	describe('increment', () => {
		it('should return UpdateResult', async () => {
			const deletedResult = await service.increment({ id: '1' }, 'id', 1);
			expect(deletedResult.raw).toBeDefined();
			expect(deletedResult.affected).toBeDefined();
			expect(deletedResult.affected).toEqual(2);
			expect(deletedResult.generatedMaps).toBeDefined();
		});
	});
	describe('decrement', () => {
		it('should return UpdateResult', async () => {
			const deletedResult = await service.decrement({ id: '1' }, 'id', 1);
			expect(deletedResult.raw).toBeDefined();
			expect(deletedResult.affected).toBeDefined();
			expect(deletedResult.affected).toEqual(2);
			expect(deletedResult.generatedMaps).toBeDefined();
		});
	});
	describe('query', () => {
		it('should defined result', async () => {
			const result = await service.query('SELECT * FROM "test"');
			expect(result).toBeDefined();
		});
	});
});
