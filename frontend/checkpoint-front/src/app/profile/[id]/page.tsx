interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <h1>Perfil de usuario {id}</h1>;
}
