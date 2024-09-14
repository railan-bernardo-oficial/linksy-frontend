import Image from "next/image";
import AvatarMan from "../../../public/avatar-1.webp";
import { useUser } from "@/app/context/UserContext";
import api from "@/services/api";
import { useRef, useState } from "react";

type Inputs = {
  content: string
}

interface CreatePostProps {
  onPostCreated: () => void;
}

export default function SendPost({ onPostCreated }: CreatePostProps) {
  const { setUser, user } = useUser();
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const editableRef = useRef<HTMLDivElement>(null);

  const handleInput = async (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.textContent || '')
  }

  const handleFocus = () => {
    setIsFocused(true);
    if (editableRef.current && !content) {
      // Move o cursor para o início
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(editableRef.current, 0);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const handleBlur = () => {
    if (!content) {
      setIsFocused(false);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    const postData = {
      userId: user?.id,
      content: content
    }
    const response = await api.post('/post', postData, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(async (res) => {
      const { post } = res.data;
      setContent('')
      setIsFocused(false);

      if (editableRef.current) {
        editableRef.current.innerHTML = ''; // Limpa manualmente o conteúdo da div
      }

      onPostCreated();

    }).catch((e) => {
      setContent('')
      console.log("Error: ", e.message)
    });
  }

  return (
    <div className="w-full bg-white pb-5  border border-zinc-200">
      <div className="w-full grid grid-cols-12 p-5 border-b border-b-zinc-200">
        <div className="col-span-2">
          <Image
            src={AvatarMan}
            width={50}
            height={50}
            quality={100}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="col-span-10">
          <div className="w-full">
            <div
              ref={editableRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              contentEditable={true}
              onInput={handleInput}
              suppressContentEditableWarning={true}
              className="w-full min-h-32 outline-none text-base text-zinc-500 px-6 py-5"
              data-placeholder="Digitar...">
              {!isFocused && !content &&
                <span className="text-zinc-500 text-base font-medium">Digitar...</span>
              }
            </div>

          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end px-5 py-3">
        <button onClick={handleSubmit} className="flex items-center px-4 py-2 justify-center text-white rounded-3xl bg-blue-500 transition-all duration-300 hover:bg-blue-600">
          Postar
        </button>
      </div>
    </div>
  )
}