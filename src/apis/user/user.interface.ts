import { BaseService } from '@common';
import { UserEntity } from './entities/user.entity';

export abstract class IUserService extends BaseService<UserEntity> {}
