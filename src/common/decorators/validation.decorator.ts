import { applyDecorators } from '@nestjs/common';
import * as Validators from 'class-validator';

export const IsString = () =>
	applyDecorators(
		Validators.IsString({
			message: 'validation.IS_STRING'
		})
	);

export const IsNotEmpty = () =>
	applyDecorators(
		Validators.IsNotEmpty({
			message: 'validation.IS_NOT_EMPTY'
		})
	);

export const IsNumber = () =>
	applyDecorators(
		Validators.IsNumber(
			{},
			{
				message: 'validation.IS_NUMBER'
			}
		)
	);

export const IsNumberString = () =>
	applyDecorators(
		Validators.IsNumberString(
			{},
			{
				message: 'validation.IS_NUMBER_STRING'
			}
		)
	);

export const IsJSON = () =>
	applyDecorators(
		Validators.IsJSON({
			message: 'validation.IS_JSON'
		})
	);

export const IsObject = () =>
	applyDecorators(
		Validators.IsObject({
			message: 'validation.IS_OBJECT'
		})
	);

export const IsEmail = () =>
	applyDecorators(
		Validators.IsEmail(
			{},
			{
				message: 'validation.IS_EMAIL'
			}
		)
	);

export const IsDateString = () =>
	applyDecorators(
		Validators.IsDateString(
			{},
			{
				message: 'validation.IS_DATE_STRING'
			}
		)
	);

export const Max = (value: number) =>
	applyDecorators(
		Validators.Max(value, {
			message: 'validation.MAX'
		})
	);

export const Min = (value: number) =>
	applyDecorators(
		Validators.Min(value, {
			message: 'validation.MIN'
		})
	);
