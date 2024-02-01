import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiExcludeController,
	ApiHeader,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	getSchemaPath
} from '@nestjs/swagger';
import {
	ReferenceObject,
	SchemaObject
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Language } from '../enums/language.enum';

export const getBaseProperties = (
	status: number
): Record<string, SchemaObject | ReferenceObject> => {
	return {
		status: { example: status },
		message: { example: 'success' }
	};
};

export const getPaginationProperties = (): Record<string, SchemaObject | ReferenceObject> => {
	return {
		pagination: {
			properties: {
				limit: { example: 10 },
				page: { example: 1 },
				total: { example: 10 }
			}
		}
	};
};

export const getBaseSchema = ($ref: any, status = 200): SchemaObject & Partial<ReferenceObject> => {
	return {
		properties: {
			...getBaseProperties(status),
			data: { $ref: getSchemaPath($ref) }
		}
	};
};

export const getPaginationSchema = (
	$ref: any,
	status = 200
): SchemaObject & Partial<ReferenceObject> => {
	return {
		properties: {
			...getBaseProperties(status),
			data: {
				type: 'array',
				items: {
					$ref: getSchemaPath($ref)
				}
			},
			...getPaginationProperties()
		}
	};
};

/**
 * Swagger cho API tạo
 * @param $ref Class Schema
 * @param name Tên schema
 * @example ApiCreate(User, 'user')
 */
export const ApiCreate = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Tạo mới một ' + name }),
		ApiCreatedResponse({
			description: 'Tạo mới một ' + name + ' thành công',
			schema: getBaseSchema($ref, 201)
		}),
		ApiBadRequestResponse({ description: 'Sai kiểu hoặc thiếu dữ liệu trong body' }),
		ApiConflictResponse({ description: 'Dữ liệu tạo bị trùng lặp (đã tạo rồi)' })
	);

/**
 * Swagger cho API lấy danh sách
 * @param $ref Class Schema
 * @param name Tên schema
 * @example ApiGetAll(User, 'user')
 */
export const ApiGetAll = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Lấy danh sách các ' + name }),
		ApiOkResponse({
			description: 'Lấy danh sách các ' + name + ' thành công',
			schema: getPaginationSchema($ref)
		})
	);

/**
 * Swagger cho API lấy chi tiết
 * @param $ref Class Schema
 * @param name Tên schema
 * @example ApiGetOne(User, 'user')
 */
export const ApiGetOne = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Lấy chi tiết một ' + name }),
		ApiOkResponse({
			description: 'Lấy chi tiết một ' + name + ' thành công',
			schema: getBaseSchema($ref)
		}),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

/**
 * Swagger cho API cập nhật
 * @param $ref Class Schema
 * @param name Tên schema
 * @example ApiUpdate(User, 'user')
 */
export const ApiUpdate = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Cập nhật một ' + name }),
		ApiOkResponse({
			description: 'Cập nhật một ' + name + ' thành công',
			schema: getBaseSchema($ref)
		}),
		ApiBadRequestResponse({ description: 'Sai kiểu hoặc thiếu dữ liệu trong body' }),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

/**
 * Swagger cho API xoá
 * @param $ref Class Schema
 * @param name Tên schema
 * @example ApiDelete(User, 'user')
 */
export const ApiDelete = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Xoá một ' + name }),
		ApiOkResponse({
			description: 'Xoá một ' + name + ' thành công',
			schema: getBaseSchema($ref)
		}),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

/**
 * Swagger ngôn ngữ
 * @example ApiLanguage()
 */
export const ApiLanguage = () =>
	applyDecorators(
		ApiHeader({
			name: 'x-lang',
			description: 'Ngôn ngữ',
			enum: Language,
			required: false
		})
	);

/**
 * Swagger ẩn controller trên production
 * @example ApiHideController()
 */
export const ApiHideController = () =>
	applyDecorators(ApiExcludeController(process.env.NODE_ENV === 'production'));

/**
 * Swagger cho controller
 * @example ApiController()
 */
export const ApiController = (name: string) =>
	applyDecorators(ApiHideController(), ApiLanguage(), ApiTags(`${name} API`));
