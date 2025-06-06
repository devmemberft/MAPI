import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest){
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;

    if(pathname === '/login') return NextResponse.next();

    if(!token){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher:['/((?!login).*)'], // para agregar otra ruta, usar el formato regex |/|/clients|/products....
}