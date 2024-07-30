"use client";

import { useCallback, useState } from "react";
import Button from "../components/button/Button";
import { ExcelContainer } from "../components/excel/ExcelContainer";
import { ExcelMapping } from "../lib/excel/readExcel";
import If from "../components/core/ui/If";
import {
  ArrowDownCircleIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

export function CsvToJson() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ExcelMapping | null>(null);

  const handleImport = useCallback((file: File, data: ExcelMapping | null) => {
    setFile(file);
    setData(data);
  }, []);

  const onDownload = useCallback(() => {
    const jsonString = JSON.stringify(data, null, 2); // Pretty-print with 2 spaces indentation
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  }, [data]);

  const onClipboard = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 bg-slate-200 border border-slate-300 rounded-md overflow-hidden">
        <ExcelContainer onDataLoaded={handleImport}>
          <Button type="button" className="rounded-none">
            Open Csv
          </Button>
        </ExcelContainer>
        <div className="text-sm">
          <If
            condition={file}
            fallback={<div className="text-slate-500">No csv selected</div>}
          >
            {file?.name}
          </If>
        </div>
      </div>
      <textarea
        id="jsonTextarea"
        className="bg-slate-200 border border-slate-300 rounded-md min-h-[300px]"
        disabled
        value={data ? JSON.stringify(data, null, 2) : ""}
      />
      <div className="flex gap-4">
        <Button type="button" onClick={onDownload}>
          <div className="flex items-center gap-2">
            <ArrowDownCircleIcon className="w-6 h-6" />
            Download
          </div>
        </Button>

        <Button type="button" variant="outlinePrimary" onClick={onClipboard}>
          <div className="flex items-center gap-2">
            <ClipboardIcon className="w-6 h-6" />
            Copy to clipboard
          </div>
        </Button>
      </div>
    </div>
  );
}
