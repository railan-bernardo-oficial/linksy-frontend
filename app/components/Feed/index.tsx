import { useEffect, useState } from "react";
import HeaderFeed from "../HeaderFeed";
import Post from "../Posts";
import SendPost from "../SendPost";
import api from "@/services/api";


interface PostsProps{
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

export default function FeedPost(){
  const [posts, setPosts] = useState<PostsProps[]>([])
  const token = localStorage.getItem('token')

  const getPosts = async () =>{
    await api.get('/posts', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((res)=>{
      setPosts(res.data.posts)
    }).catch((e)=>{
        console.log("Erro de: ", e.message)
    })
  }

    useEffect(()=>{
            getPosts()
    }, [])

    return (
        <div className="lg:col-span-6 col-span-12 pb-7">
            <div className="w-full px-6">
                <HeaderFeed />
                <SendPost onPostCreated={getPosts} />
                <Post items={posts} />
            </div>
        </div>
    )
}