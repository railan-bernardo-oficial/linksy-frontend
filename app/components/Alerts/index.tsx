interface AlertsProps{
    message: string;
    type: string;
}

export default function Alert({ message, type }: AlertsProps){
    return (
        <div className={`flex items-center rounded-lg py-2 px-4 ${type === "error" ? 'bg-red-500' : 'bg-green-400'}  animate-scale-up transform transition-all duration-300`}>
            <p className="text-white text-base font-normal">{message}</p>
        </div>
    )
}