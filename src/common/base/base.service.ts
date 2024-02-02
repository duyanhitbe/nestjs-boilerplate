/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseEntity, ValidationHelper } from '@common';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { extend } from 'lodash';
import {
	And,
	DeepPartial,
	DeleteResult,
	FindOptionsWhere,
	ILike,
	LessThanOrEqual,
	Like,
	MoreThanOrEqual,
	Repository,
	UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AbstractBaseService } from '../interfaces/base-service.interface';

/** 
 * BaseService là một class bao gồm các method viết sẵn phục vụ cho việc thêm xóa sửa. Nó được kế thừa bởi class khác.
 * @template T Kiểu dữ liệu của record
 */
export abstract class BaseService<T extends BaseEntity> extends AbstractBaseService<T> {
	abstract notFoundMessage: string;

	constructor(private readonly repository: Repository<T>) {
		super();
	}

	private getWhere(options: Partial<FindOptions<T>>) {
		const where = options.where || {};
		const filter = JSON.parse(options.filter || '{}');
		for (const field in filter) {
			where[field] = Like(`%${filter[field]}%`);
		}
		return where;
	}

	private setWhereGetAllWithPagination(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], filter: any) {
		let from, to;

		for (const field in filter) {
			if (field === 'from') {
				from = MoreThanOrEqual(filter[field]);
			} else if (field === 'to') {
				to = LessThanOrEqual(filter[field]);
			} else if (typeof filter[field] === 'boolean' || ValidationHelper.isUuid(filter[field])) {
				where[field] = filter[field];
			} else {
				where[field] = ILike(`%${filter[field]}%`);
			}
		}

		if (from && !to) {
			where['createdAt'] = from;
		}

		if (!from && to) {
			where['createdAt'] = to;
		}

		if (from && to) {
			where['createdAt'] = And(from, to);
		}
	}

	create(data: DeepPartial<T>): Promise<T> {
		return this.repository.create(data).save();
	}

	async createMany(datas: DeepPartial<T>[]): Promise<T[]> {
		const entities: T[] = [];
		for(const data of datas){
			const entity = await this.create(data);
			entities.push(entity);
		}
		return entities;
	}

	getOne(options: FindOptions<T>): Promise<T | null> {
		const { relations, loadEagerRelations, order, withDeleted, select } = options;
		const where = this.getWhere(options);
		return this.repository.findOne({ where, relations, loadEagerRelations, order, withDeleted, select });
	}

	async getOneOrFail(options: FindOrFailOptions<T>): Promise<T> {
		const errorMessage = options?.errorMessage || this.notFoundMessage;
		const where = this.getWhere(options);
		const entity = await this.getOne({ ...options, where });
		if (!entity) throw new NotFoundException(errorMessage);
		return entity;
	}

	getOneById(id: string, options?: Partial<FindOptions<T>>): Promise<T | null> {
		const where = { id } as FindOptionsWhere<T>;
		return this.getOne({ ...options, where });
	}

	async getOneByIdOrFail(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const errorMessage = options?.errorMessage || this.notFoundMessage;
		const entity = await this.getOneById(id, options);
		if (!entity) throw new NotFoundException(errorMessage);
		return entity;
	}

	async getOneOrCreate(options: FindOptions<T>, data?: DeepPartial<T>): Promise<T>{
		const entity = await this.getOne(options);
		if (!entity){
			if (!data){
				throw new InternalServerErrorException('Missing creation data');
			}
			return this.create(data);
		}
		return entity;
	}

	getAll(options: Partial<FindOptions<T>>): Promise<T[]> {
		const { relations, order, loadEagerRelations, withDeleted, select } = options;
		const where = this.getWhere(options);
		return this.repository.find({
			where,
			relations,
			order,
			loadEagerRelations,
			withDeleted,
			select
		});
	}

	async getAllPaginated(options: FindWithPaginationOptions<T>): Promise<IPaginationResponse<T>> {
		const loadEagerRelations = options.loadEagerRelations;
		const select = options.select;
		const withDeleted = options.withDeleted;
		const where = options.where || [];
		const filter = options.filter || {};
		const order = options.order || {};
		const relations = options.relations;
		const limit = +(options.limit || 10);
		const page = +(options.page || 1);
		const take = limit === -1 ? undefined : limit;
		const skip = limit === -1 ? undefined : limit * (+page - 1);

		this.setWhereGetAllWithPagination(where, filter);

		const findAndCountOptions = { where, order, relations, take, skip, loadEagerRelations, withDeleted, select };
		const [data, total] = await this.repository.findAndCount(findAndCountOptions);

		return {
			data,
			pagination: {
				limit: limit === -1 ? total : limit,
				page: limit === -1 ? 1 : page,
				total
			}
		};
	}

	async update(options: FindOrFailOptions<T>, data: QueryDeepPartialEntity<T>): Promise<T> {
		const entity = await this.getOneOrFail(options);
		const newEntity = extend<T>(entity, data);
		return newEntity.save();
	}

	async updateById(id: string, data: QueryDeepPartialEntity<T>, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const entity = await this.getOneByIdOrFail(id, options);
		const newEntity = extend<T>(entity, data);
		return newEntity.save();
	}

	async remove(options: FindOrFailOptions<T>): Promise<T> {
		const entity = await this.getOneOrFail(options);
		return this.repository.remove(entity);
	}

	async removeById(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const entity = await this.getOneByIdOrFail(id, options);
		return this.repository.remove(entity);
	}

	removeAll(): Promise<DeleteResult> {
		return this.repository.delete({})
	}

	async softRemove(options: FindOrFailOptions<T>): Promise<T> {
		const entity = await this.getOneOrFail(options);
		return this.repository.softRemove(entity);
	}

	async softRemoveById(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const entity = await this.getOneByIdOrFail(id, options);
		return this.repository.softRemove(entity);
	}

	softRemoveAll(): Promise<DeleteResult> {
		return this.repository.softDelete({})
	}

	count(options: Partial<FindOptions<T>>) {
		return this.repository.count(options);
	}

	getQueryBuilder(alias?: string) {
		return this.repository.createQueryBuilder(alias);
	}

	increment(where: FindOptionsWhere<T>, field: string, value: number): Promise<UpdateResult> {
		return this.repository.increment(where, field, value);
	}

	decrement(where: FindOptionsWhere<T>, field: string, value: number): Promise<UpdateResult> {
		return this.repository.decrement(where, field, value);
	}

	query<K = any>(queryString: string): Promise<K>{
		return this.repository.query(queryString);
	}
}
