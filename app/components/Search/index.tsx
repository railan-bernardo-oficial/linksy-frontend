import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function Search(){
    return (
        <div className="w-full">
            <form className="w-full flex items-center relative">
                <input 
                type="text"
                placeholder="Buscar"
                className="rounded-[30px] pl-10 pr-2 py-3 text-base font-medium border-none ring-0 outline-none bg-zinc-100"
                />
                <button className="absolute left-2 z-10">
                    <FiSearch size={22} className="text-zinc-500" />
                </button>
            </form>

            <div className="w-full border-t border-r-zinc-200 mt-5 pt-5">
              <Link href="" className="text-sm text-blue-600 font-light">
               Privacidade
              </Link>
              <span className="px-1 text-sm text-blue-600 font-light">.</span>
              <Link href="" className="text-sm text-blue-600 font-light">
               Termos
              </Link>
              <span className="px-1 text-sm text-blue-600 font-light">.</span>
              <Link href="" className="text-sm text-blue-600 font-light">
               Ajuda
              </Link>
            </div>
        </div>
    )
}