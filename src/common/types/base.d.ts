import { BaseEntity } from '@common';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';

declare global {
	type FindOptions<T extends BaseEntity> = {
		/** Điều kiện */
		where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
		/** Sắp xếp */
		order?: FindOptionsOrder<T>;
		/** Nối bảng */
		relations?: string[];
		/** Bật tắt eager */
		loadEagerRelations?: boolean;
		/** Chứa những dữ liệu đã bị xóa */
		withDeleted?: boolean;
		/** Chọn trường lấy ra từ DB */
		select?: FindOptionsSelect<T>;
	};

	type FindOrFailOptions<T extends BaseEntity> = FindOptions<T> & {
		/** Thông báo khi không tìm thấy record */
		errorMessage?: string;
	};

	type FindPaginatedOptions<T extends BaseEntity> = Partial<FindOptions<T>> & {
		/** Số item trong một trang */
		limit?: number;
		/** Số trang hiện tại */
		page?: number;
		/**
		 * Lọc
		 * @examples { "name": "ABC" }
		 */
		filter?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
	};

	type IPaginationResponse<T> = {
		/** Mảng các items */
		data: T[];
		pagination: {
			/** Số item trong một trang */
			limit: number;
			/** Số trang hiện tại */
			page: number;
			/** Tổng số lượng item */
			total: number;
		};
	};

	type IResponse<T> = {
		/** Response status code */
		status: number;
		/** Thông báo */
		message: string;
		/** Dữ liệu */
		data: T;
		/** Dữ liệu phân trang */
		pagination?: {
			/** Số item trong một trang */
			limit: number;
			/** Số trang hiện tại */
			page: number;
			/** Tổng số lượng item */
			total: number;
		};
	};

	type GenerateTokenData = {
		accessToken: string;
	};

	type LogoutData = {
		success: boolean;
	};
}

export {};
