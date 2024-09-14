import Image from "next/image";
import AvatarMon from "../../../public/avatar-2.webp";
import Link from "next/link";
import { FaEllipsisV, FaGenderless, FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { formatPostDate } from "@/Helpers";

interface PostsProps{
    items: Posts[];
}[]

type Posts = {
    id: number,
    userId: number,
    content?: string | null,
    imageUrl?: string | null,
    createdAt: string,
    user: {
        id: number,
        name: string,
        avatarUrl?: string | null,
        email: string
    }
}

export default function Post({ items }: PostsProps) {
   
    return (
        <>
        {items.map((item: Posts, index: number) =>{
          return (
            <div className="w-full bg-white border border-zinc-200 mt-4" key={index}>
            <div className="w-full p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image
                            src={item.user.avatarUrl ?? AvatarMon}
                            width={40}
                            height={40}
                            alt="avatar"
                            className="rounded-full"
                        />
                        <Link href="/" className="text-base font-semibold text-zinc-500 hover:text-zinc-600 transition-all duration-300">
                            {item.user.name}
                        </Link>
                        <button className="text-blue-500 text-sm font-bold hover:underline">Seguir</button>
                        <FaGenderless size={10} className="text-zinc-500"/>
                        <span className="text-xs font-bold text-zinc-500">{formatPostDate(item?.createdAt)}</span>
                    </div>
                    <button className="text-zinc-500 hover:text-zinc-600 transition-all duration-300">
                        <FaEllipsisV size={20} />
                    </button>
                   
                </div>
                <div className="w-full p-4 mt-4">
                    <p className="text-base font-semibold text-zinc-600">{item?.content}</p>
                </div>
                <div className="w-full flex gap-4 justify-end items-center">
                    <button className="text-zinc-500 hover:text-red-500 transition-all duration-300">
                        <FaRegHeart size={24} />
                    </button>
                    <button className="text-zinc-500 hover:text-red-500 transition-all duration-300">
                        <FaRegBookmark size={24} />
                    </button>
                    <button className="text-zinc-500 hover:text-red-500 transition-all duration-300">
                        <FaRegComment size={24} />
                    </button>
                </div>
            </div>
        </div>
          )
        })}
        </>
    )
}