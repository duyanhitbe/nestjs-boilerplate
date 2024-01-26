import { UnauthorizedException } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';

export function getTokenFromHeader(headers: IncomingHttpHeaders) {
	const bearerToken = headers.authorization;
	if (!bearerToken) {
		throw new UnauthorizedException('Missing authorization');
	}
	const [prefix, accessToken] = bearerToken.split(' ');
	if (prefix.toLowerCase() !== 'bearer' || !accessToken) {
		throw new UnauthorizedException('access token malformed');
	}
	return accessToken;
}
