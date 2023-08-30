/* eslint-disable @next/next/no-img-element */
import { Note } from "@/types/Note";
import NoteOptions from "./NoteOptions";

export default function NoteCard(
    { note }: { note: Note }
) {
    return (
        <div className="px-3 pt-2 pb-5 bg-white text-black rounded-lg">

            <div className="flex items-center gap-2">
                <img
                    src={`https://i.pravatar.cc/150?u=${note.user}`}
                    alt={note.user}
                    className="object-cover w-6 h-6 rounded-full"
                />

                <div className="flex gap-1 items-center">
                    <span className="text-sm capitalize">{note.user}</span>
                    <span className="text-slate-500">7d</span>
                </div>

                <NoteOptions note={note} />
            </div>

            <h2 className="text-xl font-bold capitalize">{note.title}</h2>

            {note.img && (
                <div className="my-2">
                    <img
                        src={note.img}
                        alt={note.title}
                        className="object-cover w-full h-36 rounded-lg"
                    />
                </div>
            )}

            <section>
                <p className="text-sm">
                    {note.description}
                </p>
            </section>

        </div>
    );
}
