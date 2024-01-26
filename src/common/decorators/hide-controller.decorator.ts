import { applyDecorators } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

export const HideController = () =>
	applyDecorators(ApiExcludeController(process.env.NODE_ENV === 'production'));
