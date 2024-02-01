import { getBaseProperties } from '@common';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Swagger login
 * @param userType Loại người dùng
 * @example ApiLogin('user')
 */
export const ApiLogin = (userType: UserType) =>
	applyDecorators(
		ApiOperation({ summary: `Đăng nhập ${userType}` }),
		ApiOkResponse({
			schema: {
				properties: {
					...getBaseProperties(200),
					data: {
						properties: {
							accessToken: { example: 'string' },
							expiresIn: { example: 12345678 }
						}
					}
				}
			}
		})
	);
