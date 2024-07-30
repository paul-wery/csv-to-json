import { read, WorkBook } from "xlsx";

function getRow(key: string) {
  return key.replace(/\D+/g, "");
}

function getCol(key: string) {
  return key.replace(/\d+/g, "");
}

export type ExcelMapping = Record<string, string | number>[];

const getRows = (workbook: WorkBook, sheetIndex: number) => {
  const sheet = Object.values(workbook.Sheets)[sheetIndex];
  const rows: ExcelMapping = [];
  const titlesKey = getRow(
    Object.keys(sheet).find((key) => !key.startsWith("!"))!
  );
  const titles: Record<string, string> = {};

  Object.keys(sheet).forEach((key) => {
    if (key.includes(titlesKey)) {
      titles[getCol(key)] = sheet[key].v;
    }
  });

  const data: Record<string, string | number> = Object.entries(sheet).reduce(
    (acc, [key, value]) => {
      const col = getRow(key);

      if (key.startsWith("!") || col === titlesKey) {
        return acc;
      }
      return { ...acc, [key]: value.v };
    },
    {}
  );

  const jsonRaw: Record<string, Record<string, string | number>> = {};

  Object.entries(data).forEach(([key, value]) => {
    const row = getRow(key);
    const col = getCol(key);

    if (!jsonRaw[row]) jsonRaw[row] = {};
    jsonRaw[row][titles[col]] = value;
  });

  const json: ExcelMapping = Object.values(jsonRaw);

  return { titles: Object.values(titles), data: json };
};

interface ReadExcelProps {
  buffer: ArrayBuffer;
  sheetIndex?: number;
}

export function readExcel({ buffer, sheetIndex = 0 }: ReadExcelProps): {
  titles: string[];
  data: ExcelMapping | null;
} {
  try {
    const workbook = read(buffer);

    return getRows(workbook, sheetIndex);
  } catch (error) {
    console.error(error);
    return { titles: [], data: null };
  }
}
