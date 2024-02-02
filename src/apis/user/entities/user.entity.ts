import { BaseEntity } from '@common';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiHideProperty } from '@nestjs/swagger';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';

@ObjectType('User')
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
	/** Tài khoản đăng nhập */
	@Column()
	@Field({ description: 'Tài khoản đăng nhập' })
	username!: string;

	/** Mật khẩu */
	@ApiHideProperty()
	@Column()
	@Exclude()
	password!: string;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await hash(this.password);
	}
}
