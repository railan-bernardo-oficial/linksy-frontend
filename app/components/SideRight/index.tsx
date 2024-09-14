import Search from "../Search";

export default function SideRight(){
    return (
        <aside className="w-[337.25px] fixed py-5 px-5 top-0 right-0 col-span-12 bg-white border border-zinc-200 h-screen">
           <Search />
        </aside>
    )
}