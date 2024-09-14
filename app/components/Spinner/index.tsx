import { RiLoader4Fill } from "react-icons/ri";

interface StylesProps {
    className: {
        [key: string]: string | number;
    },
    sizeIcon: number;
    text?: string;
}

export default function Spinner({ className, sizeIcon, text }: StylesProps){
    return (
        <div style={{...className}}>
            {text &&
            <span>{text}</span>
            }
           <RiLoader4Fill size={sizeIcon} className="animate-spin" />
        </div>
    )
}