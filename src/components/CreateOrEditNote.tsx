/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react";
import Dialog from "./Dialog";
import { useNoteContext } from "@/context/NoteContext";
import { convertToBase64, getFormData } from "@/utils";

export default function CreateOrEditNote() {
    const { addOrEditNote, handleAddOrEditNote, addNote, updateNote } = useNoteContext();
    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data = getFormData(e.currentTarget);

        const newNote = {
            id: addOrEditNote.note?.id || crypto.randomUUID(),
            title: data.title as string,
            description: data.description as string,
            img: preview || addOrEditNote.note?.img || "",
            userId: "1",
            user: "Current User"
        };

        if (addOrEditNote.note) {
            updateNote(newNote);
        } else {
            addNote(newNote);
        }
        handleAddOrEditNote({ open: false, note: null });
        setPreview(null);
    }

    return (
        addOrEditNote.open && (
            <Dialog className="md:w-[32%] w-[95%] p-0 overflow-hidden rounded-2xl shadow-2xl">
                <div className="bg-white px-6 py-6 sm:px-8 sm:py-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="border-b border-gray-100 pb-4 mb-4">
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                                {addOrEditNote.note ? 'Edit Note' : 'Create New Note'}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {addOrEditNote.note ? 'Update your thoughts and ideas.' : 'Capture your thoughts and ideas.'}
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    defaultValue={addOrEditNote.note?.title || ''}
                                    placeholder="Enter a catchy title..."
                                    className="block w-full rounded-xl border-slate-200 bg-slate-50 py-2.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all duration-200 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="What's on your mind?"
                                    className="block w-full rounded-xl border-slate-200 bg-slate-50 py-2.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all duration-200 sm:text-sm sm:leading-6 resize-none"
                                    defaultValue={addOrEditNote.note?.description || ''}
                                />
                            </div>

                            <div>
                                <label htmlFor="img" className="block text-sm font-medium text-slate-700 mb-1">
                                    Cover Image
                                </label>
                                <div className="mt-1 flex justify-center rounded-xl border border-dashed border-slate-300 px-6 py-6 hover:bg-slate-50 transition-colors cursor-pointer relative">
                                    <div className="text-center">
                                        {!preview && !addOrEditNote.note?.img ? (
                                            <>
                                                <svg className="mx-auto h-10 w-10 text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>
                                                <div className="mt-2 flex text-sm leading-6 text-slate-600 justify-center">
                                                    <span className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="img"
                                                            name="img"
                                                            type="file"
                                                            accept="image/*"
                                                            className="sr-only"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    convertToBase64(file).then((result) => {
                                                                        setPreview(result as string);
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    </span>
                                                </div>
                                                <p className="text-xs leading-5 text-slate-500">PNG, JPG, GIF up to 10MB</p>
                                            </>
                                        ) : (
                                            <div className="relative group w-full">
                                                <img
                                                    src={preview || addOrEditNote.note?.img || ""}
                                                    alt="Preview"
                                                    className="h-40 w-full object-cover rounded-lg"
                                                />
                                                <label htmlFor="img" className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer text-white font-medium">
                                                    Change Image
                                                    <input
                                                        id="img"
                                                        name="img"
                                                        type="file"
                                                        accept="image/*"
                                                        className="sr-only"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                convertToBase64(file).then((result) => {
                                                                    setPreview(result as string);
                                                                });
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8 pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                className="flex-1 justify-center py-2.5 px-4 border border-slate-300 shadow-sm text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
                                onClick={() => {
                                    handleAddOrEditNote({ open: false, note: null })
                                    setPreview(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                            >
                                {addOrEditNote.note ? 'Save Changes' : 'Create Note'}
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog>
        )
    );
}
