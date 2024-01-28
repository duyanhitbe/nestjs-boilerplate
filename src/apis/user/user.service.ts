import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './user.interface';

@Injectable()
export class UserService extends IUserService {
	notFoundMessage = 'Không tìm thấy User';

	constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
		super(userRepo);
	}
}
