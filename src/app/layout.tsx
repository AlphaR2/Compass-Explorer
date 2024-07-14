import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Footer from "@/components/ui/footer";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Compass Explorer",
  description: "The Leading User Friendly explorer on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable}  antialiased bg-[#060e16] text-gray-300 tracking-wide`}
      >
        <div className="flex flex-col  min-h-screen overflow-hidden">
        

          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
