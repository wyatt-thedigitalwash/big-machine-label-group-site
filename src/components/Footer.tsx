import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black">
      <div
        className="w-full h-px"
        style={{ backgroundColor: "#CA2125" }}
      />

      <div className="px-6 pt-12 pb-12 md:px-10">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex-shrink-0">
            <Image
              src="/wordmark.svg"
              alt="Big Machine Records"
              width={220}
              height={24}
              className="h-5 w-auto"
            />
          </div>

          <p
            className="font-[family-name:var(--font-body)] text-[12px] text-center order-3 md:order-2"
            style={{ color: "#717171" }}
          >
            2025 Big Machine Records. All rights reserved.
          </p>

          <div className="flex gap-5 order-2 md:order-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white transition-colors duration-300 ease-out hover:text-[#CA2125]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="0" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-white transition-colors duration-300 ease-out hover:text-[#CA2125]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.482 17.308a.75.75 0 01-1.03.257c-2.82-1.724-6.37-2.114-10.553-1.158a.75.75 0 11-.334-1.462c4.572-1.045 8.496-.595 11.66 1.333a.75.75 0 01.257 1.03zm1.463-3.26a.937.937 0 01-1.287.308c-3.228-1.984-8.148-2.56-11.964-1.4a.937.937 0 11-.544-1.793c4.36-1.325 9.778-.682 13.487 1.597a.937.937 0 01.308 1.288zm.126-3.397C15.612 8.39 9.072 8.18 5.285 9.33a1.125 1.125 0 11-.653-2.153c4.35-1.32 11.58-1.065 16.152 1.587a1.125 1.125 0 01-1.713 1.187z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
