import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { MainPanel } from "./components/ui/panel";
import { PersistentHeader } from "./components/ui/header";
import { ThemeProvider } from "next-themes";
import LoginView from "./features/login/LoginView";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <LoginView/>
        <div className="">
          < MainPanel />
          <main className="fixed top-12 right-0 left-42 bottom-0 overflow-auto">{children}</main>
        </div>  
        
      </ThemeProvider>
      </body>
    </html>
  );
}
