import { ThemeProvider } from "next-themes";

export default function LoginLayout({children}:Readonly<{children:React.ReactNode}>){
    return (
        <body className="h-screen w-screen bg-transparent" suppressHydrationWarning>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
            </ThemeProvider>
        </body>
    );
}