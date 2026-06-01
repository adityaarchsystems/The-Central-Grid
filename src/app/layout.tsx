import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
});

export const metadata: Metadata = {
  title: "THE CENTRAL GRID | The Sanctuary for Hardcore Builders",
  description: "A hyper-selective, physical guild and production engineering layer across the Raipur-Bhilai-Durg corridor. Focused on deep-learning models, local inference, and zero-fluff hardware loops.",
  metadataBase: new URL("https://centralgrid.tech"),
  openGraph: {
    title: "THE CENTRAL GRID",
    description: "The Sanctuary for Hardcore Builders across the Raipur-Bhilai-Durg corridor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-[#06030a] text-white min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
