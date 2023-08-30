"use client"
import { AddIcon } from "./icons/AddIcon";
import { useNoteContext } from "@/context/NoteContext";

export default function FloatingButton() {
    const { handleAddOrEditNote } = useNoteContext();

    return (
        <button
            className="absolute bottom-5 right-8 p-5 text-2xl rounded-full bg-lime-300"
            onClick={() => handleAddOrEditNote({ open: true, note: null })}
        >
            <AddIcon />
        </button>
    );
}
