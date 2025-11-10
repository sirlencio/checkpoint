export const MOCK_GAMES = [
  {
    id: 1029,
    name: "The Legend of Zelda: Ocarina of Time",
    slug: "zelda-ocarina-of-time",
    summary: "Un clásico absoluto de acción y aventura.",
    storyline: "Link viaja en el tiempo para salvar Hyrule.",
    first_release_date: "1998-11-21T00:00:00Z",
    rating: 96.5,
    total_rating: 97.2,

    cover: { id: 170637, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3nnx.jpg" },

    genres: [
      { id: 12, name: "Adventure" },
      { id: 31, name: "Action" },
    ],

    platforms: [
      { id: 4, name: "Nintendo 64" },
      { id: 41, name: "Nintendo 3DS" },
    ],

    companies: [
      { id: 1, name: "Nintendo", role: "dev" },
      { id: 1, name: "Nintendo", role: "publisher" },
    ],

    screenshots: [
      { id: 951639, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/sckeaf.jpg" },
      { id: 951640, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/sckeag.jpg" },
    ],

    videos: [
      { id: 50001, url: "https://youtu.be/dQw4w9WgXcQ" },
    ],

    remakes: [101],
    expansions: [],
    franchises: [10],
  },

  {
    id: 8593,
    name: "The Legend of Zelda: Majora's Mask",
    slug: "zelda-majoras-mask",
    summary: "Secuela oscura del Ocarina of Time.",
    storyline: "Link tiene 3 días para evitar la destrucción del mundo.",
    first_release_date: "2000-04-27T00:00:00Z",
    rating: 92.3,
    total_rating: 93.8,

    cover: { id: 86231, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ujb.jpg" },

    genres: [
      { id: 12, name: "Adventure" },
      { id: 31, name: "Action" },
    ],

    platforms: [
      { id: 4, name: "Nintendo 64" },
      { id: 41, name: "Nintendo 3DS" },
    ],

    companies: [
      { id: 1, name: "Nintendo", role: "dev" },
      { id: 1, name: "Nintendo", role: "publisher" },
    ],

    screenshots: [],
    videos: [],

    remakes: [],
    expansions: [],
    franchises: [10],
  },

  {
    id: 119133,
    name: "Elden Ring",
    slug: "elden-ring",
    summary: "El RPG de mundo abierto de FromSoftware.",
    storyline: "Un Sinluz busca restaurar el Círculo de Elden.",
    first_release_date: "2022-02-25T00:00:00Z",
    rating: 95.0,
    total_rating: 95.7,

    cover: { id: 212094, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg" },

    genres: [
      { id: 12, name: "RPG" },
      { id: 31, name: "Action" },
    ],

    platforms: [
      { id: 6, name: "PC" },
      { id: 48, name: "PlayStation 5" },
      { id: 49, name: "Xbox Series X" },
    ],

    companies: [
      { id: 33, name: "FromSoftware", role: "dev" },
      { id: 70, name: "Bandai Namco", role: "publisher" },
    ],

    screenshots: [
      { id: 703441, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/scf2s1.jpg" },
      { id: 487789, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/scagdp.jpg" },
    ],

    videos: [
      { id: 50002, url: "https://youtu.be/E3Huy2cdih0" },
    ],

    remakes: [],
    expansions: [200], // Shadow of the Erdtree (mock)
    franchises: [],
  },

  {
    id: 19560,
    name: "God of War (2018)",
    slug: "god-of-war-2018",
    summary: "Kratos inicia un nuevo viaje en tierras nórdicas.",
    storyline: "Kratos y Atreus emprenden un viaje personal.",
    first_release_date: "2018-04-20T00:00:00Z",
    rating: 94.5,
    total_rating: 94.8,

    cover: { id: 85062, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg" },

    genres: [
      { id: 31, name: "Action" },
      { id: 25, name: "Hack and Slash" },
    ],

    platforms: [
      { id: 48, name: "PlayStation 4" },
      { id: 6, name: "PC" },
    ],

    companies: [
      { id: 58, name: "Santa Monica Studio", role: "dev" },
      { id: 2, name: "Sony", role: "publisher" },
    ],

    screenshots: [],
    videos: [],

    remakes: [],
    expansions: [],
    franchises: [20],
  },

  {
    id: 1877,
    name: "Cyberpunk 2077",
    slug: "cyberpunk-2077",
    summary: "Un RPG futurista en Night City.",
    storyline: "V lucha por sobrevivir mientras comparte su mente con Johnny Silverhand.",
    first_release_date: "2020-12-10T00:00:00Z",
    rating: 86.1,
    total_rating: 88.2,

    cover: { id: 480315, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaam3.jpg" },

    genres: [
      { id: 12, name: "RPG" },
      { id: 31, name: "Action" },
    ],

    platforms: [
      { id: 6, name: "PC" },
      { id: 48, name: "PlayStation 4" },
      { id: 49, name: "Xbox One" },
    ],

    companies: [
      { id: 53, name: "CD Projekt Red", role: "dev" },
      { id: 53, name: "CD Projekt", role: "publisher" },
    ],

    screenshots: [],
    videos: [],

    remakes: [],
    expansions: [201], // Phantom Liberty (mock)
    franchises: [],
  },

  {
    id: 14593,
    name: "Hollow Knight",
    slug: "hollow-knight",
    summary: "Un metroidvania desafiante y atmosférico.",
    storyline: "Un caballero recorre Hallownest en busca de su destino.",
    first_release_date: "2017-02-24T00:00:00Z",
    rating: 90.0,
    total_rating: 90.4,

    cover: { id: 424251, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co93cr.jpg" },

    genres: [
      { id: 8, name: "Platformer" },
      { id: 31, name: "Action" },
    ],

    platforms: [
      { id: 6, name: "PC" },
      { id: 48, name: "PlayStation 4" },
      { id: 130, name: "Nintendo Switch" },
    ],

    companies: [
      { id: 80, name: "Team Cherry", role: "dev" },
      { id: 80, name: "Team Cherry", role: "publisher" },
    ],

    screenshots: [],
    videos: [],

    remakes: [],
    expansions: [],
    franchises: [],
  },

  {
    id: 25076,
    name: "Red Dead Redemption 2",
    slug: "red-dead-redemption-2",
    summary: "El oeste nunca había sido tan real.",
    storyline: "Arthur Morgan lucha por sobrevivir mientras su banda se desmorona.",
    first_release_date: "2018-10-26T00:00:00Z",
    rating: 96.0,
    total_rating: 96.4,

    cover: { id: 80403, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg" },

    genres: [
      { id: 31, name: "Action" },
      { id: 5, name: "Shooter" },
    ],

    platforms: [
      { id: 6, name: "PC" },
      { id: 48, name: "PlayStation 4" },
      { id: 49, name: "Xbox One" },
    ],

    companies: [
      { id: 66, name: "Rockstar Games", role: "dev" },
      { id: 66, name: "Rockstar Games", role: "publisher" },
    ],

    screenshots: [],
    videos: [],

    remakes: [],
    expansions: [],
    franchises: [30],
  },

  {
    id: 1942,
    name: "The Witcher 3: Wild Hunt",
    slug: "the-witcher-3-wild-hunt",
    summary: "Geralt busca a Ciri mientras enfrenta la Cacería Salvaje.",
    storyline: "Una historia épica en un mundo abierto masivo.",
    first_release_date: "2015-05-19T00:00:00Z",
    rating: 93.7,
    total_rating: 94.1,

    cover: { id: 480513, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },

    genres: [
      { id: 12, name: "RPG" },
      { id: 31, name: "Action" },
    ],

    platforms: [
      { id: 6, name: "PC" },
      { id: 48, name: "PlayStation 4" },
      { id: 49, name: "Xbox One" },
    ],

    companies: [
      { id: 53, name: "CD Projekt Red", role: "dev" },
      { id: 53, name: "CD Projekt", role: "publisher" },
    ],

    screenshots: [],
    videos: [],

    remakes: [],
    expansions: [202, 203], // Blood & Wine / Hearts of Stone
    franchises: [40],
  },

  {
    id: 26758,
    name: "Super Mario Odyssey",
    slug: "super-mario-odyssey",
    summary: "Mario viaja por mundos increíbles para rescatar a Peach.",
    storyline: "Mario y Cappy cruzan el mundo en la Odyssey.",
    first_release_date: "2017-10-27T00:00:00Z",
    rating: 97.0,
    total_rating: 97.1,

    cover: { id: 76371, url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1mxf.jpg" },

    genres: [
      { id: 8, name: "Platformer" },
    ],

    platforms: [
      { id: 130, name: "Nintendo Switch" },
    ],

    companies: [
      { id: 1, name: "Nintendo", role: "dev" },
      { id: 1, name: "Nintendo", role: "publisher" },
    ],

    screenshots: [],
    videos: [],

    remakes: [],
    expansions: [],
    franchises: [50],
  },
];
