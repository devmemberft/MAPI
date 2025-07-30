
export default function RegisterLayout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <body className="h-screen w-screen bg-transparent" suppressHydrationWarning>
            {children}
        </body>
    );
}