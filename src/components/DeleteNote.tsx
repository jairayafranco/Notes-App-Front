"use client"
import Dialog from "./Dialog";
import { useNoteContext } from "@/context/NoteContext";

export default function DeleteNote() {
    const { deleteNote, handleDeleteNote } = useNoteContext();

    return (
        deleteNote.open && (
            <Dialog className="md:w-[20%]">
                <div className="flex flex-col items-center">
                    <label htmlFor="title" className="block text-xl font-medium leading-6 text-gray-900">
                        Delete Note?
                    </label>

                    <div className="flex gap-1 mt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500"
                            onClick={() => {
                                console.log(deleteNote.noteId);
                            }}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500"
                            onClick={() => handleDeleteNote({ open: false, noteId: "" })}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Dialog>
        )
    );
}
