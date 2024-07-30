import { Header } from "../components/header";
import { CsvToJson } from "./Component";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100svh]">
      <Header />
      <div className="w-full bg-gradient-to-r from-[#0f172a] to-[#0040d4] h-[2px]" />
      <section className="bg-white text-black flex flex-1 justify-center">
        <div className="w-full max-w-[1000px]">
          <h1 className="text-[#153b95] w-full text-3xl md:text-4xl font-bold leading-[50px] md:leading-[80px]">
            CSV {">"} JSON
          </h1>
          <p>To get started, upload or paste your data from CSV Excel File.</p>
          <div className="mt-8">
            <CsvToJson />
          </div>
        </div>
      </section>
    </div>
  );
}
