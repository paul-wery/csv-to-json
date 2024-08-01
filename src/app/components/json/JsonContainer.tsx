"use client";

import { ExcelMapping } from "@/app/lib/excel/readExcel";
import { ChangeEvent } from "react";

type Props = {
  onDataLoaded: (file: File, data: ExcelMapping | null) => void;
} & Readonly<{
  children: React.ReactNode;
}>;

const jsonInputId = "import-json-input";
const accept = ".json";

export const JsonContainer: React.FC<Props> = ({ onDataLoaded, children }) => {
  const openFileBrowser = (id: string) => () =>
    document.getElementById(id)?.click();

  const onLoadJson = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    const file = files && files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const json = JSON.parse(e.target!.result as string);

          onDataLoaded(file, json);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          onDataLoaded(file, null);
        }
      };
      reader.readAsText(file);
      target.value = "";
    }
  };

  return (
    <div>
      <input
        id={jsonInputId}
        type="file"
        accept={accept}
        onChange={onLoadJson}
        style={{ display: "none" }}
      />
      <div onClick={openFileBrowser(jsonInputId)}>{children}</div>
    </div>
  );
};
