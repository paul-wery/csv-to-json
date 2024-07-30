import Image from "next/image";
import { configuration } from "../configuration";

export function Header() {
  return (
    <header className="flex flex-col md:flex-row gap-4 justify-between items-center md:h-[90px] bg-white text-[#0f172a] p-4 md:px-16">
      <div>
        <div className="font-bold text-xl italic text-transparent bg-clip-text bg-gradient-to-r from-[#0f172a] to-[#0040d4]">
          {configuration.siteName}
        </div>
        <div className="bg-gradient-to-r from-[#0f172a] to-[#0040d4] h-[4px]" />
      </div>
      <a
        href="https://paul-wery.fr/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <div className="font-bold text-xl italic text-transparent bg-clip-text bg-gradient-to-r from-[#4b337f] to-[#0f172a]">
          Made by -
        </div>
        <div className="relative">
          <Image
            src={"assets/logo.svg"}
            alt={"Paul Wéry"}
            width={0}
            height={0}
            className="w-fit h-[40px] md:h-[60px]"
          />
        </div>
      </a>
    </header>
  );
}
