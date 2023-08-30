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
            >
                <MenuIcon />
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-400 hover:text-white"
                        onClick={() => {
                            handleAddOrEditNote({ open: true, note })
                            setIsOpen(false)
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-400 hover:text-white"
                        onClick={() => {
                            handleDeleteNote({ open: true, noteId: note.id })
                            setIsOpen(false)
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};
