import { Note } from "@/types/Note";
import { ReactNode } from "react";

const MAX_COLUMNS = 6;

export default function NoteGrid(
    { notes, getNote }: { notes: Note[], getNote: (note: Note, index: number) => ReactNode }
) {
    const columns = [];

    function getColumns(colIndex: number) {
        return notes.filter((_, idx) => idx % MAX_COLUMNS === colIndex);
    }

    for (let i = 0; i < MAX_COLUMNS; i++) {
        columns.push(getColumns(i));
    }

    return (
        <div
            style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"
            }}
        >
            {
                columns.map((column, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                        {column.map(getNote)}
                    </div>
                ))
            }
        </div>
    )
}