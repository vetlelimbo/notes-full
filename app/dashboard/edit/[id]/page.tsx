export default async function EditNote({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div className="text-white">This is the edit note page</div>;
}
