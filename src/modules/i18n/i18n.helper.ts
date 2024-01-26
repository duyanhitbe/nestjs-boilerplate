import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nPath } from './generated/i18n.generated';

export function translate(message: I18nPath) {
	return i18nValidationMessage(message);
}
