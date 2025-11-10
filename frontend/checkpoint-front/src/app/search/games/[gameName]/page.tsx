interface Props {
  params: Promise<{ gameName: string }>;
}

export default async function Page({ params }: Props) {
  const { gameName } = await params;
  return <h1>Buscando juego {gameName}</h1>;
}
//Aquí habría que enlazar con el hook y decirle que me busque el juego introducido y se muestre la lista de estos juegos
//Habría que mostrar img, título, fecha lanzamiento y plataforma. Serían dos componentes, una lista de juegos y 
// un componente juego individual