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
            document.body.style.overflow = 'auto';
        } return () => {
            document.body.style.overflow = 'auto'
        };
    }, [isOpen]);

    if(!isOpen) return null;

    return (
        <div className='modal'>
            <div>
                <div className='flex w-full items-end justify-end py-6'>
                    <button className='cursor-pointer' onClick={onClose}><CircleX/></button>
                </div>
                { title && <h2>{title}</h2>}
                {children}
            </div>
        </div>
    );
}

export default Modal;