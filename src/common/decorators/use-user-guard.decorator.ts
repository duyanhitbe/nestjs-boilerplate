import { AuthStrategy } from '@apis/auth/auth.const';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const UseUserGuard = () =>
	applyDecorators(
		UseGuards(AuthGuard(AuthStrategy.USER_JWT)),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Thiếu hoặc sai token' })
	);
