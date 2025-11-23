"use client";
import NoteGrid from "./NoteGrid";
import NoteCard from "./NoteCard";
import { useNoteContext } from "@/context/NoteContext";

export default function NotesList() {
    const { notes } = useNoteContext();
    return (
        <div className="flex flex-col gap-8">
            <NoteGrid
                notes={notes || []}
                getNote={(note, idx) => (
                    <NoteCard key={idx} note={note} />
                )}
            />
        </div>
    );
}
