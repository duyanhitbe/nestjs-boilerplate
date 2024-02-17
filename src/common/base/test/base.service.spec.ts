import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { set } from 'lodash';
import { FilterQuery, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { BaseModel, Schema } from '../base.model';
import { BaseService } from '../base.service';

@Schema('test')
class TestModel extends BaseModel {
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

	sort() {
		return this;
	}

	select() {
		return this;
	}

	populate() {
		return this;
	}

	exec() {
		return this.id === '1' ? null : this;
	}
}

@Injectable()
class TestService extends BaseService<TestModel> {
	notFoundMessage: string = 'Not found entity';

	constructor(@InjectModel(TestModel.name) private readonly testRepo: Model<TestModel>) {
		super(testRepo);
	}
}

const mockTestRepository = jest.fn(() => ({
	create: jest.fn((data: Partial<TestModel>) => new TestModel()),
	findOne: jest.fn((filter: FilterQuery<TestModel>) => {
		const model = new TestModel();
		if ((filter && filter['id'] === '1') || filter['_id'] === '1') {
			model.id = filter['id'] || filter['_id'];
		}
		return model;
	}),
	find: jest.fn(() => {
		const result = {
			limitNum: 10,
			skipNum: 0,
			limit: (num) => {
				result.limitNum = num;
				return result;
			},
			skip: (num) => {
				result.skipNum = num;
				return result;
			},
			sort: (sort) => result,
			populate: (relation) => result,
			select: (select) => result,
			exec: () => {
				const data = [new TestModel(), new TestModel()];
				return data.slice(result.skipNum, result.limitNum * (result.skipNum + 1));
			}
		};
		return result;
	}),
	deleteOne: jest.fn(() => new TestModel()),
	deleteMany: jest.fn(() => ({
		acknowledged: true,
		deletedCount: 2
	})),
	updateOne: jest.fn(() => new TestModel()),
	updateMany: jest.fn(() => ({
		acknowledged: true,
		matchedCount: 1,
		modifiedCount: 1,
		upsertedCount: 1,
		upsertedId: null
	})),
	countDocuments: jest.fn(() => Promise.resolve(2)),
	increment: jest.fn(() =>
		Promise.resolve({
			raw: [],
			affected: 2,
			generatedMaps: []
		})
	),
	findOneAndUpdate: jest.fn(() => new TestModel()),
	aggregate: jest.fn(() => Promise.resolve([]))
}));

describe('BaseService', () => {
	let service: TestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TestService,
				{
					provide: getModelToken(TestModel.name),
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
				where: { id: '2' },
				sort: {},
				select: [],
				relations: []
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
			const entities = await service.getAll({
				sort: {},
				select: [],
				relations: []
			});
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
				page: 1,
				filter: {},
				search: '123',
				sort: {},
				select: [],
				relations: []
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
			expect(pagination.total).toEqual(2);
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

	describe('updateOne', () => {
		const options = {};
		const data = {
			id: '123'
		};
		beforeEach(() => {
			set(options, 'where.id', '1');
		});
		it('should throw NotFoundException', async () => {
			await expect(service.updateOne(options, data)).rejects.toThrow(NotFoundException);
		});
		it('should update entity', async () => {
			set(options, 'where.id', '2');
			const updatedEntity = await service.updateOne(options, data);
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
			expect(deletedResult.acknowledged).toBeDefined();
			expect(deletedResult.deletedCount).toBeDefined();
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
			expect(deletedResult.acknowledged).toBeDefined();
			expect(deletedResult.matchedCount).toBeDefined();
			expect(deletedResult.modifiedCount).toBeDefined();
			expect(deletedResult.upsertedCount).toBeDefined();
			expect(deletedResult.upsertedId).toEqual(null);
		});
	});
	describe('count', () => {
		it('should return result', async () => {
			const result = await service.count({});
			expect(result).toEqual(2);
		});
	});
	describe('increment', () => {
		it('should return UpdateResult', async () => {
			const updatedEntity = await service.increment({ id: '1' }, 'id', 1);
			expect(updatedEntity.id).toBeDefined();
			expect(updatedEntity.createdAt).toBeDefined();
			expect(updatedEntity.updatedAt).toBeDefined();
			expect(updatedEntity.deletedAt).toBeDefined();
			expect(updatedEntity.isActive).toBeDefined();
		});
	});
	describe('decrement', () => {
		it('should return UpdateResult', async () => {
			const updatedEntity = await service.decrement({ id: '1' }, 'id', 1);
			expect(updatedEntity.id).toBeDefined();
			expect(updatedEntity.createdAt).toBeDefined();
			expect(updatedEntity.updatedAt).toBeDefined();
			expect(updatedEntity.deletedAt).toBeDefined();
			expect(updatedEntity.isActive).toBeDefined();
		});
	});
	describe('aggregate', () => {
		it('should defined result', async () => {
			const result = await service.aggregate([]);
			expect(result).toBeDefined();
		});
	});
});
