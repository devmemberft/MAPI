import { ThemeProvider } from "next-themes";

export default function LoginLayout({children}:{children:React.ReactNode}){
    return (
    <html lang="es">
        <body className="h-screen w-screen bg-transparent">
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
            </ThemeProvider>
        </body>
    </html>
    );
}