'use client';

import { ReactNode, useEffect } from 'react';

import { X } from 'lucide-react';

type UniversalDialogProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
};

export default function UniversalDialog({ open, onClose, children, className = '' }: UniversalDialogProps) {
    useEffect(() => {
        if (open) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className='absolute top-0 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/40 backdrop-blur-md' onClick={onClose} />

            <button onClick={onClose} className='absolute top-4 right-4 z-50 rounded-full bg-white p-2 shadow'>
                <X size={20} />
            </button>

            {/* ✅ background fully controlled via className */}
            <div className={`relative z-40 rounded-xl p-4 shadow-xl ${className}`}>{children}</div>
        </div>
    );
}
