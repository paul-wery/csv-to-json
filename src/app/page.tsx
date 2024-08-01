import { Header } from "./components/header";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-[100svh]">
        <Header />
        <section className="flex-1 md:pb-[90px] bg-[#141d57] text-white">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center gap-8">
              <h1 className="text-4xl md:text-6xl font-bold text-center md:max-w-[1000px] leading-[50px] md:leading-[80px]">
                The easy and free, confidential online csv converter
              </h1>
              <p className="text-lg md:text-2xl text-[#d7d7d7] text-center">
                Easily convert your CSV files to JSON format.
              </p>
              <div className="flex gap-4">
                <a
                  href="/csv-to-json"
                  className="bg-white text-[#153b95] p-4 font-semibold rounded-lg hover:brightness-90"
                >
                  Csv to json
                </a>
                <a
                  href="/json-to-csv"
                  className="bg-white text-[#153b95] p-4 font-semibold rounded-lg hover:brightness-90"
                >
                  Json to csv
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="flex-1 md:pb-[90px] bg-white text-[#141d57] h-[100svh]">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center gap-8 md:gap-16 p-4 md:p-0 max-w-[1000px]">
            <div className="w-full">
              <h2 className="w-full text-3xl md:text-4xl font-bold leading-[50px] md:leading-[80px]">
                About Data Formats
              </h2>
              <div className="w-full bg-gradient-to-r from-[#0f172a] to-[#0040d4] h-[4px] md:-mt-2" />
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <li>
                <h3 className="text-2xl font-bold mb-2">CSV</h3>
                <p>
                  CSV is a simple file format used to store tabular data, such
                  as a spreadsheet or database. Files in the CSV format can be
                  imported to and exported from programs that store data in
                  tables, such as Microsoft Excel or OpenOffice Calc.
                </p>
              </li>
              <li>
                <h3 className="text-2xl font-bold mb-2">JSON</h3>
                <p>
                  JSON (JavaScript Object Notation) is a lightweight data
                  interchange format. It is easy for humans to read and write.
                  It is easy for machines to parse and generate. It is based on
                  a subset of the JavaScript Programming Language, Standard ECMA
                  262 3rd Edition - December 1999.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
