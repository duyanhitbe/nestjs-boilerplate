import { Injectable, PipeTransform } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashPasswordPipe implements PipeTransform<any> {
	async transform(value: any) {
		if (value.password) {
			value.password = await argon2.hash(value.password);
		}
		return value;
	}
}
