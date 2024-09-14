import Link from "next/link";

export default function HeaderFeed(){
    return (
        <header className="w-full grid grid-cols-2 overflow-hidden bg-white h-[68px] border-b border-b-zinc-200 sticky top-0 left-0 z-10">
            <Link href="" className="text-center w-full h-full p-5 text-lg font-bold text-zinc-500 border-x border-x-zinc-200 hover:bg-zinc-50 transition-all duration-300">
            Para você
            </Link>
            <Link href="" className="text-center w-full h-full p-5 text-lg font-bold text-zinc-500 border-r border-r-zinc-200 hover:bg-zinc-50 transition-all duration-300">
            Seguindo
            </Link>
        </header>
    )
}