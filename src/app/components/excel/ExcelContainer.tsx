"use client";

import { useLoadExcel } from "@/app/lib/excel/hooks/load-excel";
import { ExcelMapping } from "@/app/lib/excel/readExcel";

type Props = {
  sheetIndex?: number;
  onDataLoaded: (file: File, data: ExcelMapping | null) => void;
} & Readonly<{
  children: React.ReactNode;
}>;

const accept =
  ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

export const ExcelContainer: React.FC<Props> = ({
  sheetIndex,
  onDataLoaded,
  children,
}) => {
  const { excelInputId, openFileBrowser, onLoadExcel } = useLoadExcel({
    sheetIndex,
    onDataLoaded,
  });

  return (
    <div>
      <input
        id={excelInputId}
        type="file"
        accept={accept}
        onChange={onLoadExcel}
        style={{ display: "none" }}
      />
      <div onClick={openFileBrowser(excelInputId)}>{children}</div>
    </div>
  );
};
