"use client";
import { HandleAddOrEditNoteType, HandleDeleteNoteType, NoteContextType } from "@/types/NoteContext";
import { createContext, useContext, useState } from "react";

const NoteContext = createContext<NoteContextType | null>(null);

export function useNoteContext() {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error("useNoteContext must be used within a NoteProvider");
    }
    return context;
}

export function NoteProvider(
    { children }: { children: React.ReactNode }
) {
    const [addOrEditNote, setAddOrEditNote] = useState<HandleAddOrEditNoteType>({
        open: false,
        note: null,
    });
    const [deleteNote, setDeleteNote] = useState<HandleDeleteNoteType>({ open: false, noteId: "" });

    const handleAddOrEditNote = ({ open, note }: HandleAddOrEditNoteType) => setAddOrEditNote({ open, note });
    const handleDeleteNote = ({ open, noteId }: HandleDeleteNoteType) => setDeleteNote({ open, noteId });

    return (
        <NoteContext.Provider value={{ deleteNote, handleDeleteNote, addOrEditNote, handleAddOrEditNote }}>
            {children}
        </NoteContext.Provider>
    );
}