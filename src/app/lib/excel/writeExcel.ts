import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { ExcelMapping } from "./readExcel";

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
    console.error("autoSizeColumns error");
  }
};

export async function writeExcel(
  titles: Record<string, string>,
  rows: (string | number)[][]
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet();

  worksheet.addRows([Object.values(titles), ...rows]);
  autoSizeColumns(worksheet);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "applicationi/xlsx" });

  saveAs(blob, `data.xlsx`);
}
