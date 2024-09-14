"use client";

import { use, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"
import api from "@/services/api";
import Alert from "../components/Alerts";

type Inputs = {
  email: string
  password: string
}

interface ResponseMessage{
    message?: string | null;
    error?: string | null;
}

export default function Login() {
    const { setUser, user } = useUser();
    const router = useRouter();
    const [message, setMessage] = useState<ResponseMessage | null>(null) 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()


        if(user){
            router.push('/feed');
            return;
        }
    

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const response = await api.post('/login', data).then((res)=>{
            const { token, user } = res.data;

            // Armazena o token no localStorage ou cookie
            localStorage.setItem('token', token);

             setUser(user)
             router.push('/feed')
        }).catch((e)=>{
            setMessage(e.response.data)
            setTimeout(()=>{
                setMessage(null);
            }, 3000)
            return;
        });
        
      }

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 fixed z-10 right-3 top-20">
            {message && 
             <Alert message={message.message ?? ''} type="error" />
            }
        </div>
    <div className="w-[350px] bg-white rounded-2xl p-5 border border-zinc-200">
        <h1 className="text-3xl font-bold text-zinc-600 text-center mb-3">Login</h1>
        <div className="">
           <form onSubmit={handleSubmit(onSubmit)}>
              <input 
              type="text"
              {...register('email')}
              placeholder="E-mail"
              className="w-full py-2 px-3 rounded outline-none mb-3 border border-zinc-300 text-zinc-600 ring-0 focus:border-blue-600"
              />
              <input 
              type="password"
              {...register('password')}
              placeholder="Senha"
              className="w-full py-2 px-3 rounded outline-none border border-zinc-300 text-zinc-600 ring-0 focus:border-blue-600"
              />
              <div className="flex justify-center my-3">
                  <button type="submit" className="rounded-md py-2 px-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300">Entrar</button>
              </div>
           </form>
        </div>
    </div>
</main>
  );
}
