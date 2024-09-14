import { FiCheck } from "react-icons/fi";

export default function ToastPost(){
    return (
        <div className="flex fixed bottom-5 left-5 z-10 items-center gap-1 rounded-lg py-2 px-4 bg-black/60 animate-scale-up transform transition-all duration-300">
            <FiCheck size={22} color="white" />
            <p 
            className="text-white text-base font-normal">
                Seu post foi publicado
            </p>
        </div>
    )
}