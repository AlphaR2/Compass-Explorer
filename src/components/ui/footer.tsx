import React from "react";

const Footer = () => {
  return (
    <main className=" flex flex-col lg:flex-row  lg:justify-between border-t-2 border border-[#fca311]/10 w-full h-[25vh] lg:h-[10vh] py-6 px-6 items-center">
      <section className="flex flex-col">
        <h1 className="text-xs lg:text-sm font-black">
          Powered by Solana Blockchain | Built by AlphaR
        </h1>
      </section>

      <div className="flex flex-col md:flex-row w-full justify-center  items-center md:justify-between py-4 md:py-8 border-gray-200">
        {/* Social as */}
        <div className="">
          <ul className="flex items-center w-full mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <a
                href="https://x.com/Dan_1_Alpha"
                className="flex justify-center items-center text-black hover:text-gray-900 bg-[#fca311] hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Twitter"
              >
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                </svg>
              </a>
            </li>
            <li className="ml-4">
              <a
                href="https://github.com/AlphaR2"
                className="flex justify-center items-center text-black hover:text-gray-900 bg-[#fca311] hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Copyrights note */}
        <div className="flex   w-full items-center text-sm text-white justify-center lg:justify-end divide-x gap-4  mr-4">
          <span>&copy; Compass Explorer</span>
          <span className="  font-semibold px-2 "> ༆B̷e̷l̷₥onʇ</span>
        </div>
      </div>
    </main>
  );
};

export default Footer;
