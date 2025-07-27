import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';
import { ThemeProvider } from "next-themes";
import { NavegationBar } from "../components/navigationbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        
        <div className="">
          <main className="h-screen w-screen bg-transparent overflow-auto">
            <NavegationBar/>
            {children}
          </main>
        </div>  
        
      </ThemeProvider>
      </body>
    </html>
  );
}
