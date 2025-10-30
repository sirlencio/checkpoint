import "dotenv/config";

import express from "express";
const router = express();

router.get("/games/:name", async (req, res) => {
	const { name } = req.params;
	const body = `fields *; where name = "${name}";`;

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
});

export default router;
