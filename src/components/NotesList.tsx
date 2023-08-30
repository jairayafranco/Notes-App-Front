import NoteGrid from "./NoteGrid";
import NoteCard from "./NoteCard";
import { data } from "@/data";

export default function NotesList() {
    return (
        <div className="flex flex-col gap-8">
            <NoteGrid
                notes={data || []}
                getNote={(note, idx) => (
                    <NoteCard key={idx} note={note} />
                )}
            />
        </div>
    );
}
