import { MetadataKey } from '@common';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { EnvGuard } from '../guards/env.guard';

export const UseEnv = (...env: Env[]) => {
	return applyDecorators(SetMetadata(MetadataKey.ALLOWED_ENV, env), UseGuards(EnvGuard));
};
