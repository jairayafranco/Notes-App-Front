/* eslint-disable @next/next/no-img-element */
import { Note } from "@/types/Note";
import NoteOptions from "./NoteOptions";

export default function NoteCard(
    { note }: { note: Note }
) {
    return (
        <div className="group relative flex flex-col justify-between p-5 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <img
                            src={`https://i.pravatar.cc/150?u=${note.user}`}
                            alt={note.user}
                            className="object-cover w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                        />
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-700 capitalize">{note.user}</span>
                            <span className="text-[10px] text-slate-400">7d ago</span>
                        </div>
                    </div>
                    <NoteOptions note={note} />
                </div>

                <h2 className="text-lg font-bold text-slate-800 capitalize mb-2 leading-tight group-hover:text-primary-600 transition-colors">
                    {note.title}
                </h2>

                {note.img && (
                    <div className="my-3 overflow-hidden rounded-xl">
                        <img
                            src={note.img}
                            alt={note.title}
                            className="object-cover w-full h-40 transform group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <p className="text-sm text-slate-600 leading-relaxed">
                    {note.description}
                </p>
            </div>
        </div>
    );
}
