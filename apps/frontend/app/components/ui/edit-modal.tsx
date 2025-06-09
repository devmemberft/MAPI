'use client'

import { CircleX } from 'lucide-react';
import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose:() => void;
    children: ReactNode;
    title?:string;
    className?:string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, className}) => {
    useEffect(() => {
        if(isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'hidden';
        } return () => {
            document.body.style.overflow = 'hidden'
        };
    }, [isOpen]);

    if(!isOpen) return null;

    return (
        <div className='modal '>
            <div>
                <div className='flex justify-between items-center text-center'>
                    { title && <h3 className='text-xs'>{title}</h3>}
                    <button className='transition-colors duration-150 cursor-pointer hover:text-black' onClick={onClose}><CircleX strokeWidth={1.5} size={20}/></button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;