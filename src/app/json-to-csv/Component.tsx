"use client";

import { ArrowDownCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import Button from "../components/button/Button";
import If from "../components/core/ui/If";
import TextField from "../components/inputs/TextField";
import { JsonContainer } from "../components/json/JsonContainer";
import { ExcelMapping } from "../lib/excel/readExcel";
import { writeExcel } from "../lib/excel/writeExcel";

export function CsvToJson() {
  const [file, setFile] = useState<File | null>(null);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [data, setData] = useState<ExcelMapping | null>(null);

  const rows = useMemo(() => {
    if (!data) return [];
    return data.map((row) =>
      Object.keys(titles).map((title) => row[title] ?? "")
    );
  }, [data, titles]);

  const handleImport = useCallback(
    (file: File | null, data: ExcelMapping | null) => {
      if (data) {
        const titles = Array.from(
          data.reduce((keysSet, obj) => {
            Object.keys(obj).forEach((key) => keysSet.add(key));
            return keysSet;
          }, new Set<string>())
        );

        setTitles(
          titles.reduce((acc, title) => ({ ...acc, [title]: title }), {})
        );
      }

      setFile(file);
      setData(data);
    },
    []
  );

  const handleImportFromClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard) {
        // Read text from the clipboard
        const text = await navigator.clipboard.readText();

        handleImport(null, JSON.parse(text));
      } else {
        console.error("Clipboard API not supported");
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  }, [handleImport]);

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
    writeExcel(titles, rows);
  }, [titles, rows]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
        <div className="flex items-center gap-4 bg-slate-200 border border-slate-300 rounded-md overflow-hidden w-full md:w-auto md:min-w-[400px]">
          <JsonContainer onDataLoaded={handleImport}>
            <Button type="button" className="rounded-none">
              Open Json
            </Button>
          </JsonContainer>
          <div className="text-sm">
            <If
              condition={file}
              fallback={<div className="text-slate-500">No json selected</div>}
            >
              {file?.name}
            </If>
          </div>
        </div>
        <div className="font-bold text-lg">OR</div>
        <Button type="button" onClick={handleImportFromClipboard}>
          Paste from clipboard
        </Button>
      </div>
      <div className="font-semibold">Columns names :</div>
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
      <div className="overflow-x-auto max-h-[300px]">
        <table className="daisyui-table bg-white rounded-md">
          <thead className="text-primary">
            <tr>
              {Object.values(titles).map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <If condition={data}>
              {rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
            </If>
          </tbody>
        </table>
      </div>
      <div className="flex gap-4">
        <Button type="button" onClick={onDownload} disabled={rows.length === 0}>
          <div className="flex items-center gap-2">
            <ArrowDownCircleIcon className="w-6 h-6" />
            Download
          </div>
        </Button>
      </div>
    </div>
  );
}
