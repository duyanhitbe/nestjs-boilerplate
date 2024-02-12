/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AbstractBaseService, BaseModel } from '@common';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { extend, set } from 'lodash';
import { Aggregate, AggregateOptions, FilterQuery, Model, PipelineStage, UpdateQuery, UpdateWriteOpResult } from 'mongoose';

/** 
 * BaseService là một class bao gồm các method viết sẵn phục vụ cho việc thêm xóa sửa. Nó được kế thừa bởi class khác.
 * @template T Kiểu dữ liệu của record
 */
export abstract class BaseService<T extends BaseModel> extends AbstractBaseService<T> {
	abstract notFoundMessage: string;

	constructor(private readonly model: Model<T>) {
		super();
	}

	create(data: Partial<T>): Promise<T> {
		return this.model.create(data);
	}

	async createMany(datas: Partial<T>[]): Promise<T[]> {
		const entities: T[] = [];
		for(const data of datas) {
			const record = await this.create(data);
			entities.push(record);
		}
		return entities;
	}

	getOne(options: FindOptions<T>): Promise<T | null> {
		const { where, sort, relations, withDeleted, select } = options;
		const filter = { ...where };
		if (!withDeleted) {
			set(filter, 'deletedAt', null);
		}
		let query = this.model.findOne(filter);
		if (sort) {
			query = query.sort(sort);
		}
		if (select) {
			//@ts-ignore
			query = query.select(select);
		}
		if (relations) {
			//@ts-ignore
			query = query.populate(relations);
		}
		return query.exec();
	}

	async getOneOrFail(options: FindOrFailOptions<T>): Promise<T> {
		const errorMessage = options?.errorMessage || this.notFoundMessage;
		const record = await this.getOne(options);
		if (!record) throw new NotFoundException(errorMessage);
		return record;
	}

	getOneById(id: string, options?: Partial<FindOptions<T>>): Promise<T | null> {
		const where = { _id: id };
		return this.getOne({ ...options, where });
	}

	async getOneByIdOrFail(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const errorMessage = options?.errorMessage || this.notFoundMessage;
		const record = await this.getOneById(id, options);
		if (!record) throw new NotFoundException(errorMessage);
		return record;
	}

	async getOneOrCreate(options: FindOptions<T>, data?: Partial<T>): Promise<T>{
		const record = await this.getOne(options);
		if (!record) {
			if (!data){
				throw new InternalServerErrorException('Missing creation data');
			}
			return this.create(data);
		}
		return record;
	}

	getAll(options: Partial<FindOptions<T>>): Promise<T[]> {
		const { where, sort, relations, withDeleted, select } = options;
		const filter = { ...where };
		if (!withDeleted) {
			set(filter, 'deletedAt', null);
		}
		let query = this.model.find(filter);
		if (sort) {
			query = query.sort(sort);
		}
		if (select) {
			//@ts-ignore
			query = query.select(select);
		}
		if (relations) {
			//@ts-ignore
			query = query.populate(relations);
		}
		return query.exec();
	}

	async getAllPaginated(options: FindWithPaginationOptions<T>): Promise<IPaginationResponse<T>> {
		let where = { ...options.where };
		const relations = options.relations;
		const withDeleted = options.withDeleted;
		const sort = options.sort;
		const filter = options.filter;
		const search = options.search;
		const limit = +(options.limit || 10);
		const page = +(options.page || 1);
		const skip = limit === -1 ? 0 : limit * (+page - 1);

		if (!withDeleted) {
			set(where, 'deletedAt', null);
		}
		if (filter) {
			where = { ...where, ...filter };
		}
		if (search) {
			where = { ...where, $text : { $search : search } };
		}
		let query = this.model.find(where);
		if (limit !== -1) {
			query = query.limit(limit).skip(skip);
		}
		if (sort) {
			query = query.sort(sort);
		}
		if (relations) {
			//@ts-ignore
			query = query.populate(relations);
		}
		const data = await query.exec();
		const total = await this.model.countDocuments(where);
		
		return {
			data,
			pagination: {
				limit: limit === -1 ? total : limit,
				page: limit === -1 ? 1 : page,
				total
			}
		};
	}

	async updateOne(options: FindOrFailOptions<T>, data: UpdateQuery<T>): Promise<T> {
		const where = { ...options.where };
		if (!options.withDeleted) {
			set(where, 'deletedAt', null);
		};
		const record = await this.getOneOrFail(options);
		await this.model.findOneAndUpdate(where, data);
		const updatedRecord = extend<T>(record, data);
		return updatedRecord;
	}

	async updateById(id: string, data: UpdateQuery<T>, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const where = { _id: id };
		if (!options?.withDeleted) {
			set(where, 'deletedAt', null);
		};
		const record = await this.getOneOrFail({ ...options, where });
		await this.model.findOneAndUpdate(where, data)
		const updatedRecord = extend<T>(record, data)
		return updatedRecord;
	}

	async remove(options: FindOrFailOptions<T>): Promise<T> {
		const where = options.where || {};
		if (!options.withDeleted) {
			set(where, 'deletedAt', null);
		};
		const record = await this.getOneOrFail(options);
		await this.model.deleteOne({ ...where });
		return record;
	}

	async removeById(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const where = { _id: id };
		if (!options?.withDeleted) {
			set(where, 'deletedAt', null);
		};
		const record = await this.getOneByIdOrFail(id, options);
		await this.model.deleteOne(where);
		return record;
	}

	async removeAll(): Promise<DeleteResult> {
		return this.model.deleteMany()
	}

	async softRemove(options: FindOrFailOptions<T>): Promise<T> {
		const record = await this.getOneOrFail(options);
		const now = new Date();
		record.deletedAt = now;
		await this.model.updateOne({ _id: record.id }, { deletedAt: now })
		return record;
	}

	async softRemoveById(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const record = await this.getOneByIdOrFail(id, options);
		const now = new Date();
		record.deletedAt = now;
		await this.model.updateOne({ _id: record.id }, { deletedAt: now })
		return record;
	}

	softRemoveAll(): Promise<UpdateWriteOpResult> {
		const now = new Date();
		return this.model.updateMany({}, { deletedAt: now });
	}

	count(options: Partial<FindOptions<T>>) {
		const where = options.where || {};
		if (!options?.withDeleted) {
			set(where, 'deletedAt', null);
		};
		return this.model.countDocuments(where);
	}

	increment(where: FilterQuery<T>, field: string, value: number, options?: Partial<FindOptions<T>>): Promise<T> {
		const filter = { ...where };
		if (!options?.withDeleted) {
			set(filter, 'deletedAt', null);
		};
		//@ts-ignore
		return this.model.findOneAndUpdate(filter, { $inc: { [field]: value } }, { new: true })
	}

	decrement(where: FilterQuery<T>, field: string, value: number, options?: Partial<FindOptions<T>>): Promise<T> {
		const filter = { ...where };
		if (!options?.withDeleted) {
			set(filter, 'deletedAt', null);
		};
		//@ts-ignore
		return this.model.findOneAndUpdate(filter, { $inc: { [field]: -value } }, { new: true })
	}

	aggregate(pipeline?: PipelineStage[], options?: AggregateOptions): Aggregate<Array<T>> {
		return this.model.aggregate(pipeline, options);
	}
}
