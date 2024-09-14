"use client"

import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext"
import { Suspense, useEffect } from "react";
import SideNav from "../components/SideNav";
import SideRight from "../components/SideRight";
import FeedPost from "../components/Feed";

export default function Feed(){
    const { user } = useUser();
    const router = useRouter();
 

        if(!user){
            router.push('/')
            return;
        }

    return (
            <main className="w-full min-h-screen">
                <div className="w-full h-full grid grid-cols-12">
                    <SideNav />
                    <FeedPost />
                    <SideRight />
                </div>
            </main>
    )
}