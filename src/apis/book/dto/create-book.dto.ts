import { IsNotEmpty, IsString } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Tên sách' })
	name!: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Mã người dùng' })
	userId!: string;
}
