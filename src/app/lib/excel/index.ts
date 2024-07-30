import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const stringWeight = (str: string) => {
  let weight = 0;

  for (let index = 0; index < str.length; index++) {
    if (str.charCodeAt(index) <= 127) {
      weight += 1;
    } else {
      weight += 2;
    }
  }
  return weight;
};

const autoSizeColumns = (worksheet: ExcelJS.Worksheet, minimalWidth = 10) => {
  try {
    worksheet.columns.forEach((column) => {
      let maxColumnLength = 0;

      column.eachCell!({ includeEmpty: true }, (cell) => {
        const cellLength = cell.value ? stringWeight(cell.value.toString()) : 0;

        maxColumnLength = Math.max(maxColumnLength, minimalWidth, cellLength);
      });
      column.width = maxColumnLength + 2;
    });
  } catch {
    console.error('autoSizeColumns error');
  }
};

export async function generateExcelFile(
  fileName: string,
  array: Record<string, any>[],
  extraData?: Record<string, string | number>,
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet();
  const titles = Object.keys(array[0]);

  const rows = array.map((item) => {
    return [...Object.values(item)];
  });

  if (extraData) {
    rows.push([], [], Object.keys(extraData), Object.values(extraData));
  }
  worksheet.addRows([titles, ...rows]);

  autoSizeColumns(worksheet);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'applicationi/xlsx' });

  saveAs(blob, `${fileName}.xlsx`);
}
