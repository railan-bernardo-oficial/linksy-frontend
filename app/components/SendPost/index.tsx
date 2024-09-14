"use client"
import Image from "next/image";
import AvatarMan from "../../../public/avatar-1.webp";
import { useUser } from "@/app/context/UserContext";
import api from "@/services/api";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import { RiLoader4Fill } from "react-icons/ri";
import ToastPost from "../Alerts/toast";
import EmojiPicker from "emoji-picker-react";
import { PiSmiley } from "react-icons/pi";

interface CreatePostProps {
  onPostCreated: () => void;
}

export default function SendPost({ onPostCreated }: CreatePostProps) {
  const { setUser, user } = useUser();
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const editableRef = useRef<HTMLDivElement>(null);
  const [spiner, setSpiner] = useState<boolean>(false)
  const [sweetAlert, setSweetAlert] = useState<boolean>(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);



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
    setSpiner(true)
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
        editableRef.current.innerHTML = '';
      }

      onPostCreated();
      setSpiner(false)
      setSweetAlert(true)

      setTimeout(() => {
        setSweetAlert(false)
      }, 3500)
    }).catch((e) => {
      setContent('')
      setSpiner(true)
      console.log("Error: ", e.message)
    });
  }

  // Função para inserir o emoji no conteúdo
  const onEmojiClick = (emojiObject: any) => {
    const emoji = emojiObject.emoji;

    if (editableRef.current && emoji) {
      const selection = window.getSelection();

      // Cria um novo node de texto com o emoji
      const emojiNode = document.createTextNode(emoji);

      if (selection && selection.rangeCount > 0 && selection.focusOffset > 0) {
        const range = selection.getRangeAt(0);

        // Se houver texto selecionado, remove o texto e insere o emoji no lugar
        if (!range.collapsed) {
          range.deleteContents();
        }

        // Insere o emoji na posição do cursor/seleção
        range.insertNode(emojiNode);

        // Ajusta o cursor para ficar logo após o emoji inserido
        range.setStartAfter(emojiNode);
        range.setEndAfter(emojiNode);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        setIsFocused(true);
        // Se não houver seleção, insere o emoji no final do conteúdo
        editableRef.current.appendChild(emojiNode);
        setContent(editableRef.current.innerHTML || '')
      }


    }

    // Fechar o picker após escolher um emoji
    setShowEmojiPicker(false);
  };



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
            className="rounded-full justify-center"
          />
        </div>
        <div className="col-span-10">
          <div className="w-full relative h-">
            {spiner &&
              <Spinner className={{
                display: "flex",
                justifyContent: "end",
                alignItem: "center",
                fontSize: "16px",
                color: "#3b82f6",
                gap: "6px",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                rigth: 0,
                padding: "4px 8px",
                zIndex: "8",
                background: "rgba(255,255,255, 0.7)"
              }}
                sizeIcon={30}
                text="Postando..."
              />
            }
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
      <div className="flex w-full px-5 py-3 items-center">
        <div className="w-6/12 flex items-center relative">
          {showEmojiPicker && (
            <div className="absolute top-0 left-10 z-50">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <button
            onClick={() => { setShowEmojiPicker(!showEmojiPicker); setIsFocused(true); }}
            className="text-blue-500 flex items-center justify-center bg-white w-[28px] h-[28px] rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <PiSmiley size={24} />
          </button>
        </div>
        <div className="w-6/12 flex items-center justify-end ">
          <button disabled={spiner ? true : false} onClick={handleSubmit} className={`flex items-center gap-1 px-4 py-2 justify-center text-white rounded-3xl ${spiner ? "opacity-70" : ""} bg-blue-500 transition-all duration-300 hover:bg-blue-600`}>
            {spiner &&
              <RiLoader4Fill size={20} className="animate-spin" />
            }
            Postar
          </button>
        </div>
      </div>
      {sweetAlert &&
        <ToastPost />
      }
    </div>
  )
}