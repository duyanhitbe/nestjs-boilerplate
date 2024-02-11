import { UserEntity } from '@apis/user/entities/user.entity';
import { BaseEntity } from '@common';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'book' })
export class BookEntity extends BaseEntity {
	/** Tên sách */
	@Column()
	name!: string;

	/** Mã người dùng */
	@Column()
	userId!: string;

	/** Người dùng */
	@ManyToOne(() => UserEntity)
	user?: UserEntity;
}
