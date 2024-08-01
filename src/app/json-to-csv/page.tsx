import { Header } from "../components/header";
import { CsvToJson } from "./Component";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100svh]">
      <Header />
      <div className="w-full bg-gradient-to-r from-[#0f172a] to-[#0040d4] h-[2px]" />
      <section className="bg-white text-black flex flex-1 justify-center px-4 pb-8 md:pb-0">
        <div className="w-full max-w-[1000px]">
          <h1 className="text-[#153b95] w-full text-3xl md:text-4xl font-bold leading-[50px] md:leading-[80px]">
            JSON {">"} CSV
          </h1>
          <p>To get started, upload or paste your data from JSON File.</p>
          <div className="mt-8">
            <CsvToJson />
          </div>
        </div>
      </section>
    </div>
  );
}
