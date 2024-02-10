import { BaseModel } from '@common';
import { FilterQuery, SortOrder } from 'mongoose';

declare global {
	type FindOptions<T extends BaseModel> = {
		/** Điều kiện */
		where?: FilterQuery<T>;
		/** Sắp xếp */
		order?:
			| string
			| { [key: string]: SortOrder | { $meta: any } }
			| [string, SortOrder][]
			| undefined
			| null;
		/** Nối bảng */
		relations?: string[];
		/** Lọc theo field */
		filter?: string;
		/** Bật tắt eager */
		loadEagerRelations?: boolean;
		/** Chứa những dữ liệu đã bị xóa */
		withDeleted?: boolean;
		/** Chọn trường lấy ra từ DB */
		select?: string;
	};

	type FindOrFailOptions<T extends BaseModel> = FindOptions<T> & {
		/** Thông báo khi không tìm thấy record */
		errorMessage?: string;
	};

	type FindWithPaginationOptions<T extends BaseModel> = Partial<FindOptions<T>> & {
		/** Số item trong một trang */
		limit?: string;
		/** Số trang hiện tại */
		page?: string;
		/**
		 * Sắp xếp
		 * @example {"createdAt": "ASC"}
		 */
		sort?: string;
		/**
		 * Lọc
		 * @examples { "name": "ABC" }
		 */
		filter?: string;
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
}

export {};
