export function shortDate(date: Date) {
	return date.toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });
}

//DD/MM/YYYY
export function longDate(data: Date) {
	return data.toLocaleDateString('vi-VN', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
}

export function parseShortDate(date: string | undefined | null) {
	if (!date) return new Date();

	const [day, month] = date.split('-');
	// Create a new Date object
	const currentDate = new Date();
	const result = new Date(currentDate.getFullYear(), parseInt(month, 10) - 1, parseInt(day, 10));
	result.setUTCHours(0, 0, 0, 0);
	return result;
}

export function getStartOfDate(date: string) {
	const startDate = new Date(date);
	startDate.setDate(startDate.getDate() + 1);
	startDate.setHours(0, 0, 0, 0);
	return startDate;
}

export function getEndOfDate(date: string) {
	const endDate = new Date(date);
	endDate.setDate(endDate.getDate() + 1);
	endDate.setHours(23, 59, 59, 999);
	return endDate;
}

export function daysInMonth(year: number, month: number) {
	return new Date(year, month, 0).getDate();
}

export function dateDiff(first: Date, second: Date) {
	return Math.round((second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
}

export function getNow() {
	const now = new Date();
	const startOfDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
	const endOfDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
	return { startOfDate, endOfDate };
}
