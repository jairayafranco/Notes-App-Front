/* eslint-disable @next/next/no-img-element */

export default function User() {
    return (
        <div className="flex flex-row-reverse gap-2 items-center">
            <img
                src="https://i.pravatar.cc/150?u=johndoe"
                alt=""
                className="object-cover w-10 h-10 rounded-full"
            />
            <span className="capitalize text-white font-bold">John Doe</span>
        </div>
    );
}
