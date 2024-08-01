"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Button from "../components/button/Button";
import { ExcelContainer } from "../components/excel/ExcelContainer";
import { ExcelMapping } from "../lib/excel/readExcel";
import If from "../components/core/ui/If";
import {
  ArrowDownCircleIcon,
  ClipboardIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import TextField from "../components/inputs/TextField";
import React from "react";

export function CsvToJson() {
  const [file, setFile] = useState<File | null>(null);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [data, setData] = useState<ExcelMapping | null>(null);

  const json = useMemo(() => {
    if (!data) return "";

    const replacedData = data.map((row) => {
      const newRow: Record<string, string | number> = {};

      Object.entries(row).forEach(([key, value]) => {
        const title = titles[key];

        if (!title) return;
        newRow[title] = value;
      });

      return newRow;
    });
    const result = JSON.stringify(replacedData, null, 2);

    return result;
  }, [data, titles]);

  const handleImport = useCallback(
    (file: File, titles: string[], data: ExcelMapping | null) => {
      setFile(file);
      setTitles(
        titles.reduce((acc, title) => ({ ...acc, [title]: title }), {})
      );
      setData(data);
    },
    []
  );

  const onChangeTitle = useCallback(
    (key: string) => (e: ChangeEvent) => {
      setTitles((prev) => ({
        ...prev,
        [key]: (e.target as HTMLInputElement).value,
      }));
    },
    []
  );

  const onDeleteTitle = useCallback(
    (key: string) => () => {
      if (window.confirm("Are you sure you want to delete this variable?")) {
        setTitles((prev) => {
          const { [key]: _, ...rest } = prev;

          return rest;
        });
      }
    },
    []
  );

  const onDownload = useCallback(() => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  }, [json]);

  const onClipboard = useCallback(() => {
    navigator.clipboard.writeText(json);
  }, [json]);

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
      <div className="font-semibold">Variables names :</div>
      {Object.keys(titles).length > 0 && (
        <div className="flex flex-wrap items-center gap-4">
          {Object.entries(titles).map(([key, value], index, array) => (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <TextField>
                  <TextField.Input
                    value={value}
                    onChange={onChangeTitle(key)}
                  />
                </TextField>
                <XMarkIcon
                  className="w-6 h-6 cursor-pointer hover:text-red-500"
                  onClick={onDeleteTitle(key)}
                />
              </div>
              <If condition={index < array.length - 1}>
                <div className="bg-slate-500 w-[2px] h-[20px]" />
              </If>
            </React.Fragment>
          ))}
        </div>
      )}
      {Object.keys(titles).length === 0 && (
        <TextField className="w-[100px]">
          <TextField.Input defaultValue="..." disabled />
        </TextField>
      )}
      <textarea
        id="jsonTextarea"
        className="bg-slate-200 border border-slate-300 rounded-md min-h-[300px]"
        disabled
        value={json}
      />
      <div className="flex gap-4">
        <Button type="button" onClick={onDownload} disabled={!json}>
          <div className="flex items-center gap-2">
            <ArrowDownCircleIcon className="w-6 h-6" />
            Download
          </div>
        </Button>

        <Button
          type="button"
          variant="outlinePrimary"
          onClick={onClipboard}
          disabled={!json}
        >
          <div className="flex items-center gap-2">
            <ClipboardIcon className="w-6 h-6" />
            Copy to clipboard
          </div>
        </Button>
      </div>
    </div>
  );
}
