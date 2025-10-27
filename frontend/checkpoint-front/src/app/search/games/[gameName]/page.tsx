interface Props {
  params: Promise<{ gameName: string }>;
}

export default async function Page({ params }: Props) {
  const { gameName } = await params;
  return <h1>Buscando juego {gameName}</h1>;
}
