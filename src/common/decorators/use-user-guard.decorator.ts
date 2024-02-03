import { UserJwtGuard } from '@apis/auth/guards/user-jwt.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const UseUserGuard = () =>
	applyDecorators(
		UseGuards(UserJwtGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Thiếu hoặc sai token' })
	);
