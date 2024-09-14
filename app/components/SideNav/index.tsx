import Image from "next/image";
import Link from "next/link";
import { FaRegBell, FaRegCommentDots, FaRegUserCircle, } from "react-icons/fa";
import { GoHash } from "react-icons/go";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import AvatarMan from "../../../public/avatar-1.webp";

export default function SideNav() {
    return (
        <aside className="lg:col-span-3 col-span-1 h-screen">
            <div className="w-[337.25px] pl-20 h-screen fixed top-0 left-0 bg-white border-r border-r-zinc-200">
                <div className="w-full flex pl-5 py-5">
                <Image 
                src={AvatarMan}
                width={50}
                height={50}
                alt="avatar"
                className="rounded-full shadow-md"
                />
                </div>
                <ul className="flex flex-col pr-2 pt-2">
                    <li>
                        <Link href="/" className="flex hover:bg-zinc-50 rounded-[30px] px-6 py-3 text-zinc-500 hover:text-zinc-600 transition-all duration-300">
                            <div className="w-full flex items-center gap-2">
                                <IoHomeOutline size={22} />
                                <span className="text-xl font-medium">Início</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="flex hover:bg-zinc-50 rounded-[30px] px-6 py-3 text-zinc-500 hover:text-zinc-600 transition-all duration-300">
                            <div className="w-full flex items-center gap-2">
                                <IoSearch size={22} />
                                <span className="text-xl font-medium">Buscar</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="flex hover:bg-zinc-50 rounded-[30px] px-6 py-3 text-zinc-500 hover:text-zinc-600 transition-all duration-300">
                            <div className="w-full flex items-center gap-2">
                                <FaRegBell size={22} />
                                <span className="text-xl font-medium">Notificações</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="flex hover:bg-zinc-50 rounded-[30px] px-6 py-3 text-zinc-500 hover:text-zinc-600 transition-all duration-300">
                            <div className="w-full flex items-center gap-2">
                                <FaRegCommentDots size={22} />
                                <span className="text-xl font-medium">Chat</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="flex hover:bg-zinc-50 rounded-[30px] px-6 py-3 text-zinc-500 hover:text-zinc-600 transition-all duration-300">
                            <div className="w-full flex items-center gap-2">
                                <GoHash size={22} />
                                <span className="text-xl font-medium">Feeds</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="flex hover:bg-zinc-50 rounded-[30px] px-6 py-3 text-zinc-500 hover:text-zinc-600 transition-all duration-300">
                            <div className="w-full flex items-center gap-2">
                                <FaRegUserCircle size={22} />
                                <span className="text-xl font-medium">Perfil</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}