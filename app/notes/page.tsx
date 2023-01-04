import Link from "next/link";
// import PocketBase from "pocketbase";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getNotes() {
  // Don't need to use the old fetch system, instead we  can use the builtin system of pocketBase
    const res = await fetch(
      "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
      { cache: "no-store" }
    );
  const data = await res.json();

//   const pb = new PocketBase("http://127.0.0.1:8090");
//   const data = await pb.records.getList("notes");

  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{created}</h5>
        <p>{content}</p>
      </div>
    </Link>
  );
}
