'use client';
import Link from "next/link";
import { SquarePlus, SquareUser, ArrowLeftRight, HandCoins, House} from "lucide-react";

export function NavegationBar(){
    return(
        <nav className="navegation-bar bg-[#0e0f0f] fixed left-0 bottom-0 py-2 w-full space-x-8 rounded-t-xl items-center text-center justify-center">
            <Link href={'/home'}><button className="cursor-pointer bg-[#00a140] p-2 rounded-xl"><House  size={20} color="black"/></button></Link>
            <Link href={'/savings'}><button className="cursor-pointer bg-[#00a140] p-2 rounded-xl text-black"><HandCoins size={20}/></button></Link>
            <Link href={'/transactions'}><button className="cursor-pointer bg-[#00a140] p-2 rounded-xl text-black" ><SquarePlus size={20}/></button></Link>
            <Link href={'/reports'}><button className="cursor-pointer bg-[#00a140] p-2 rounded-xl text-black" ><ArrowLeftRight size={20}/></button></Link>
            <Link href={'/profile'}><button className="cursor-pointer bg-[#00a140] p-2 rounded-xl text-black" ><SquareUser size={20}/></button></Link>
        </nav>
    );
}