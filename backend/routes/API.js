import "dotenv/config";

import express from "express";
const router = express();

// Obtener un juego por ID
router.get("/game/:id", async (req, res) => {
  try {
    const { id } = req.params;
console.log("ID recibido en el backend:", id);
    const body = `
      fields name, cover.url, first_release_date, rating,
             genres.name, platforms.name,
             summary, screenshots.url, videos.video_id;
      where id = ${Number(id)};
    `;
console.log("Cuerpo de la solicitud IGDB:", body);
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "text/plain",
      },
      body,
    });

    const data = await response.json();
	console.log(data);
    res.json(data); // devuelve un array con un solo juego
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el juego" });
  }
});


/* -------------------------------------------
   🔍  Buscar juegos por nombre (Search)
-------------------------------------------- */
router.get("/games/:name", async (req, res) => {
  try {
    // Decodificar espacios (%20 → espacio real)
    const rawName = req.params.name;
    const name = decodeURIComponent(rawName);

    const body = `
      search "${name}";
      fields name, cover.url, first_release_date, rating,
             genres.name, platforms.name,
             summary,
             screenshots.url, videos.video_id;
      limit 20;
    `;

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "text/plain",
      },
      body,
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar juegos" });
  }
});

/* -------------------------------------------
   ⭐  Juegos populares (rating / hypes)
-------------------------------------------- */
router.get("/games", async (req, res) => {
  try {
    const body = `
      fields name, hypes, cover.url, first_release_date, rating,
             genres.name, platforms.name,
             summary,
             screenshots.url, videos.video_id;
      sort rating desc;
      limit 10;
    `;

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "text/plain",
      },
      body,
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener juegos populares" });
  }
});

/* -------------------------------------------
   🧩  Obtener motor del juego
-------------------------------------------- */
router.get("/game-engine/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const body = `
      fields *;
      where id = ${name};
    `;

    const response = await fetch("https://api.igdb.com/v4/game_engines", {
      method: "POST",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "text/plain",
      },
      body,
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el motor del juego" });
  }
});

export default router;

