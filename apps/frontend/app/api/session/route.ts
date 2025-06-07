
/*
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getData } from "../../utils/apiClient";

export async function GET(){
    const token = (await cookies()).get("session.token")?.value;

    if(!token){ return NextResponse.json({ user:null }); }

    try {
        const user = await getData('/users');
        return NextResponse.json( { user });
    } catch {
        return NextResponse.json({ user:null });
    }
}

*/