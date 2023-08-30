import Header from "./Header";

export default function Container(
    { children }: { children: React.ReactNode }
) {
    return (
        <section className="p-4">
            <Header />
            {children}
        </section>
    );
}
