interface Props {
  params: Promise<{ username: string }>;
}

export default async function Page({ params }: Props) {
  const { username } = await params;
  return <h1>Buscando usuario {username}</h1>;
}
