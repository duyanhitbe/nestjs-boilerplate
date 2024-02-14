import { translate } from '@app/modules/i18n/i18n.helper';
import { applyDecorators } from '@nestjs/common';
import * as validator from 'class-validator';

export const IsString = (validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.IsString({ ...validationOptions, message: translate('validation.IS_STRING') })
	);

export const IsNotEmpty = (validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.IsNotEmpty({
			...validationOptions,
			message: translate('validation.IS_NOT_EMPTY')
		})
	);

export const IsEmail = (validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.IsEmail({}, { ...validationOptions, message: translate('validation.IS_EMAIL') })
	);

export const IsNumber = (
	options?: validator.IsNumberOptions,
	validationOptions?: validator.ValidationOptions
) =>
	applyDecorators(
		validator.IsNumber(options, {
			...validationOptions,
			message: translate('validation.IS_NUMBER')
		})
	);

export const IsNumberString = (validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.IsNumberString(
			{},
			{
				...validationOptions,
				message: translate('validation.IS_NUMBER_STRING')
			}
		)
	);

export const IsDateString = (validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.IsDateString(
			{},
			{
				...validationOptions,
				message: translate('validation.IS_DATE_STRING')
			}
		)
	);

export const Min = (minValue: number, validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.Min(minValue, {
			...validationOptions,
			message: translate('validation.MIN')
		})
	);

export const Max = (maxValue: number, validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.Max(maxValue, {
			...validationOptions,
			message: translate('validation.MAX')
		})
	);
