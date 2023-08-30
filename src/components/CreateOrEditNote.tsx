/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react";
import Dialog from "./Dialog";
import { useNoteContext } from "@/context/NoteContext";
import { convertToBase64, getFormData } from "@/utils";

export default function CreateOrEditNote() {
    const { addOrEditNote, handleAddOrEditNote } = useNoteContext();
    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data = getFormData(e.currentTarget);

        const newNote = {
            id: addOrEditNote.note?.id || crypto.randomUUID(),
            title: data.title,
            description: data.description,
            img: preview || addOrEditNote.note?.img || null,
            userId: "1"
        };
        console.log(newNote);
    }

    return (
        addOrEditNote.open && (
            <Dialog className="md:w-[32%]">
                <form className="space-y-12" onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10 pb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            {addOrEditNote.note ? 'Edit' : 'Create'} Note
                        </h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Note Title
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            defaultValue={addOrEditNote.note?.title || ''}
                                            autoComplete="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Note Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                        defaultValue={addOrEditNote.note?.description || ''}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <div className="md:flex items-center justify-between">
                                    <div className="mt-2">
                                        <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                                            Note Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="img"
                                            id="img"
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    convertToBase64(file).then((result) => {
                                                        setPreview(result as string);
                                                    });
                                                }
                                            }}
                                        />
                                    </div>

                                    {preview && (
                                        <div className="col-span-full mt-2">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="object-cover rounded-lg h-36"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-1 mt-4">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500">
                                {addOrEditNote.note ? 'Edit' : 'Create'}
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500"
                                onClick={() => {
                                    handleAddOrEditNote({ open: false, note: null })
                                    setPreview(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </form>
            </Dialog>
        )
    );
}
