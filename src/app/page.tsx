import FloatingButton from "@/components/FloatingButton";
import CreateOrEditNote from "@/components/CreateOrEditNote";
import DeleteNote from "@/components/DeleteNote";
import NotesList from "@/components/NotesList";
import Container from "@/components/Container";

export default function Home() {
  return (
    <main className="overflow-auto">
      <Container>
        <NotesList />
      </Container>

      <FloatingButton />
      <CreateOrEditNote />
      <DeleteNote />
    </main>
  )
}
