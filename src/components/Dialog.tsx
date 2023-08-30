import { twMerge } from 'tailwind-merge'

export default function Dialog(
    { children, className }: { children: React.ReactNode, className?: string }
) {
    return (
        <div className="h-screen w-full fixed backdrop-blur-sm top-0 flex items-center justify-center backdrop-brightness-50">
            <dialog
                className={twMerge("mb-16 rounded-lg shadow-lg bg-white p-8 w-10/12", className)} open>
                {children}
            </dialog>
        </div>
    );
}
