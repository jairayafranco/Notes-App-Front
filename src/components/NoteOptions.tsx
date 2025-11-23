"use client"
import { useState, useEffect, useRef } from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { useNoteContext } from '@/context/NoteContext';
import { Note } from '@/types/Note';

export default function NoteOptions(
    { note }: { note: Note }
) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const { handleDeleteNote, handleAddOrEditNote } = useNoteContext();

    const toggleNoteOptions = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative ml-auto flex flex-row-reverse" ref={dropdownRef}>
            <button
                onClick={toggleNoteOptions}
                className="p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
            >
                <MenuIcon />
            </button>
            {isOpen && (
                <div className="absolute top-8 right-0 w-36 bg-white border border-slate-100 shadow-xl rounded-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-1">
                        <button
                            className="flex w-full items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors"
                            onClick={() => {
                                handleAddOrEditNote({ open: true, note })
                                setIsOpen(false)
                            }}
                        >
                            <svg className="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                        <button
                            className="flex w-full items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            onClick={() => {
                                handleDeleteNote({ open: true, noteId: note.id })
                                setIsOpen(false)
                            }}
                        >
                            <svg className="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
