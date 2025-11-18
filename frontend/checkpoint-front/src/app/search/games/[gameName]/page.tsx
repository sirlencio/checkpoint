import React from "react";
import SearchClient from "@/app/search/games/[gameName]/SearchClient";

interface Props {
  params: Promise<{ gameName: string }>;
}

export default function SearchPage({ params }: Props) {
  const { gameName } = React.use(params); // ⚡ desempaquetamos la promesa
  return <SearchClient gameName={gameName} />;
}
