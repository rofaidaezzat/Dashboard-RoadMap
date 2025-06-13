
import React, { ReactNode } from "react";

interface Iprops {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title:string,
    description:string
    children:ReactNode
}

const DeleteModal = ({ isOpen, setIsOpen,children,description,title }: Iprops) => {

    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black ">{title}</h2>
            <button onClick={() => setIsOpen(false)} className="text-black">
                ✕
            </button>
        </div>
        <p className="text-black ">
            {description}
        </p>
        <div className="flex justify-end gap-2 mt-6">
            {children}
        </div>
        </div>
    </div>
    );
};

export default DeleteModal;
