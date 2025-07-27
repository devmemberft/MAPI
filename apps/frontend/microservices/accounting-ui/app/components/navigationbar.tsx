'use client';
import Link from "next/link";
import { SquarePlus, SquareUser, ArrowLeftRight, HandCoins, House} from "lucide-react";

export function NavegationBar(){
    return(
        <nav className="navegation-bar bg-[#171c1b] fixed left-0 bottom-0 py-2 w-full space-x-8 rounded-t-md items-center text-center justify-center">
            <Link href={'/home'}><button className="cursor-pointer p-2 rounded-xl text-white"><House  size={20}/></button></Link>
            <Link href={'/savings'}><button className="cursor-pointer p-2 rounded-xl text-white"><HandCoins size={20}/></button></Link>
            <Link href={'/transactions'}><button className="cursor-pointer p-2 rounded-xl text-white" ><SquarePlus size={20}/></button></Link>
            <Link href={'/reports'}><button className="cursor-pointer p-2 rounded-xl text-white" ><ArrowLeftRight size={20}/></button></Link>
            <Link href={'/profile'}><button className="cursor-pointer p-2 rounded-xl text-white" ><SquareUser size={20}/></button></Link>
        </nav>
    );
}