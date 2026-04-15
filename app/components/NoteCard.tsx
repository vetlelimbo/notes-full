export default function NoteCard({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-white bg-zinc-900 border-zinc-800 text-center rounded-md p-4 border">
      <h2 className="text-white text-lg">{title}</h2>
      <p className="text-zinc-600 text-md">{description}</p>
    </div>
  );
}
