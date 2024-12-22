import React, { useState } from "react";
import AvatarModel from "../component/AvatarModel";
import ItemPanel from "../component/ItemPanel";
import toast, { Toaster } from 'react-hot-toast';

function ThirdHom() {
    const [avatarElements, setAvatarElements] = useState([])

    function handleDrop(item) {
        setAvatarElements((prev) => [...prev, item])
    }

    function handleSubmit() {
        const size = avatarElements.length
        if (size === 0) {
            return toast.error('Please post pictures!!')
        }
        toast.success("Submitted Avatar Elements logged in console!", { icon: '🖋️' })
        console.log("Submitted Avatar Elements:", avatarElements)
    }

    return (
        <>
            <Toaster />
            <div className="flex justify-between items-center gap-5 mx-auto w-full max-w-[650px] select-none">
                <ItemPanel />
                <AvatarModel onDrop={handleDrop} />
                <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 rounded-md w-[150px] text-white transform transition-transform active:scale-95" > Submit Avatar </button>
            </div>
        </>
    )
}

export default ThirdHom;
