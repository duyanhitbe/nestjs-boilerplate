import { JwtSignOptions } from '@nestjs/jwt';

export const JwtService = jest.fn().mockReturnValue({
	sign: async (_payload: JwtPayload, _options?: Omit<JwtSignOptions, 'secret'>) => 'accessToken'
});
