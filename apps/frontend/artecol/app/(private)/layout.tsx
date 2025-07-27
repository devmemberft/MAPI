import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';
import { MainPanel } from "../components/ui/panel";
import { ThemeProvider } from "next-themes";

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
  /*const session = await cookies().get('session.token')?.value;
  const loginRoute = typeof window !== 'undefined' && window.location.pathname === '/login';
  if(!loginRoute) redirect('/login');
  */
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        
        <div className="">
          < MainPanel />
          <main className="fixed top-6 right-6 left-24 bottom-6 bg-[#101413] border-1 border-black/5 shadow shadow-amber-100/5 overflow-auto">{children}</main>
        </div>  
        
      </ThemeProvider>
      </body>
    </html>
  );
}
