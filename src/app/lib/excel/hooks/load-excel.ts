import { ChangeEvent } from "react";
import { ExcelMapping, readExcel } from "../readExcel";

interface Props {
  sheetIndex?: number;
  onDataLoaded: (
    file: File,
    titles: string[],
    data: ExcelMapping | null
  ) => void;
}

const excelInputId = "import-excel-input";

export const useLoadExcel = ({ sheetIndex, onDataLoaded }: Props) => {
  const openFileBrowser = (id: string) => () =>
    document.getElementById(id)?.click();

  const onLoadExcel = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    const file = files && files[0];

    if (file) {
      const { titles, data } = readExcel({
        buffer: await file.arrayBuffer(),
        sheetIndex,
      });

      onDataLoaded(file, titles, data);
      target.value = "";
    }
  };

  return { excelInputId, openFileBrowser, onLoadExcel };
};
