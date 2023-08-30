import Link from "next/link";
import User from "./User";

export default function Header() {
    return (
        <header>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white py-5">
                    Notes App
                </h1>
                <User />
            </div>
            <nav>
                <ul className="flex gap-2 mb-6">
                    <li>
                        <Link href="/" className="bg-white text-black px-4 py-2 rounded-md">
                            All
                        </Link>
                    </li>
                    <li>
                        <Link href="/mynotes" className="bg-white text-black px-4 py-2 rounded-md">
                            My Notes
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
