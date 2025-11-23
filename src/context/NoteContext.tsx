"use client";
import { HandleAddOrEditNoteType, HandleDeleteNoteType, NoteContextType } from "@/types/NoteContext";
import { createContext, useContext, useEffect, useState } from "react";
import { data } from "@/data";
import { Note } from "@/types/Note";

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
    const [notes, setNotes] = useState<Note[]>([]);
    const [addOrEditNote, setAddOrEditNote] = useState<HandleAddOrEditNoteType>({
        open: false,
        note: null,
    });
    const [deleteNote, setDeleteNote] = useState<HandleDeleteNoteType>({ open: false, noteId: "" });

    useEffect(() => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            setNotes(JSON.parse(storedNotes));
        } else {
            setNotes(data);
        }
    }, []);

    const saveNotes = (newNotes: Note[]) => {
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes));
    };

    const addNote = (note: Note) => {
        const newNotes = [note, ...notes];
        saveNotes(newNotes);
    };

    const updateNote = (updatedNote: Note) => {
        const newNotes = notes.map((note) => (note.id === updatedNote.id ? updatedNote : note));
        saveNotes(newNotes);
    };

    const removeNote = (noteId: string) => {
        const newNotes = notes.filter((note) => note.id !== noteId);
        saveNotes(newNotes);
    };

    const handleAddOrEditNote = ({ open, note }: HandleAddOrEditNoteType) => setAddOrEditNote({ open, note });
    const handleDeleteNote = ({ open, noteId }: HandleDeleteNoteType) => setDeleteNote({ open, noteId });

    return (
        <NoteContext.Provider value={{
            notes,
            addNote,
            updateNote,
            removeNote,
            deleteNote,
            handleDeleteNote,
            addOrEditNote,
            handleAddOrEditNote
        }}>
            {children}
        </NoteContext.Provider>
    );
}