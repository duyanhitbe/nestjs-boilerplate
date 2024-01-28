import { BaseEntity } from '@common';
import { hash } from 'argon2';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
	@Column()
	username!: string;

	@Column()
	password!: string;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await hash(this.password);
	}
}
