import { BaseModel } from '@common';
import { FilterQuery, SortOrder } from 'mongoose';

declare global {
	type FindOptions<T extends BaseModel> = {
		/** Điều kiện */
		where?: FilterQuery<T>;
		/** Sắp xếp
		 * @example { createdAt: -1 }
		 */
		sort?:
			| string
			| { [key: string]: SortOrder | { $meta: any } }
			| [string, SortOrder][]
			| undefined
			| null;
		/** Nối bảng */
		relations?: string | string[];
		/** Chứa những dữ liệu đã bị xóa */
		withDeleted?: boolean;
		/** Chọn trường lấy ra từ DB */
		select?: string | string[];
	};

	type FindOrFailOptions<T extends BaseModel> = FindOptions<T> & {
		/** Thông báo khi không tìm thấy record */
		errorMessage?: string;
	};

	type FindWithPaginationOptions<T extends BaseModel> = Partial<FindOptions<T>> & {
		/** Số item trong một trang */
		limit?: number;
		/** Số trang hiện tại */
		page?: number;
		/**
		 * Lọc
		 * @examples { "name": "ABC" }
		 */
		filter?: FilterQuery<T>;
		/** Tìm kiếm */
		search?: string;
	};

	type GenerateTokenData = {
		accessToken: string;
	};

	type LogoutData = {
		success: boolean;
	};
	type DeleteResult = {
		acknowledged: boolean;
		deletedCount: number;
	};
	class IResponse<T extends BaseModel> {
		/** Response status code */
		status!: number;
		/** Thông báo */
		message!: string;
		/** Dữ liệu */
		data!: T;
		/** Dữ liệu phân trang */
		pagination?: {
			/** Số item trong một trang */
			limit: number;
			/** Số trang hiện tại */
			page: number;
			/** Tổng số lượng item */
			total: number;
		};
	}
	class IPaginationResponse<T> {
		/** Mảng các items */
		@Expose()
		data!: T[];

		@Expose()
		pagination!: IPagination;
	}
}

export {};
