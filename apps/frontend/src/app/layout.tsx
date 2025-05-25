import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { MainPanel } from "./components/panel";
import { PersistentHeader } from "./components/header";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panel",
  description: "Admin panel",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>

        <div className="">
          < MainPanel />
          <main className="fixed top-12 right-0 left-18 bottom-0 overflow-auto">{children}</main>
        </div>  
        
      </ThemeProvider>
      </body>
    </html>
  );
}
