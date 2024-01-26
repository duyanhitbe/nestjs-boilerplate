import { Column, Workbook, Worksheet } from 'exceljs';

export class ExcelHelper {
	workBook!: Workbook;

	constructor() {
		this.workBook = new Workbook();
	}

	format(sheet: Worksheet) {
		sheet.columns.forEach((column) => {
			this.autoSize(column);
			this.style(column);
		});
	}

	autoSize(column: Partial<Column>) {
		let maxLength = 0;
		if (column.eachCell) {
			column.eachCell({ includeEmpty: true }, function (cell) {
				const columnLength = cell.value ? cell.value.toString().length : 10;
				if (columnLength > maxLength) {
					maxLength = columnLength;
				}
			});
		}
		column.width = maxLength < 10 ? 10 : maxLength;
	}

	style(column: Partial<Column>) {
		if (column.eachCell) {
			column.eachCell({ includeEmpty: true }, function (cell) {
				cell.style = {
					alignment: {
						horizontal: 'center',
						vertical: 'middle'
					},
					border: {
						bottom: {
							color: {
								argb: '#000'
							},
							style: 'thin'
						},
						top: {
							color: {
								argb: '#000'
							},
							style: 'thin'
						},
						left: {
							color: {
								argb: '#000'
							},
							style: 'thin'
						},
						right: {
							color: {
								argb: '#000'
							},
							style: 'thin'
						}
					}
				};
			});
		}
	}

	writeFile(filename: string) {
		if (filename.includes('.xlsx')) {
			this.workBook.xlsx.writeFile(`excel/${filename}`);
		} else {
			this.workBook.xlsx.writeFile(`excel/${filename}.xlsx`);
		}
	}
}
