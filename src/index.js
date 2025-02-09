import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

app.get('/favicon.ico', (c) => c.body(null, 204));

app.get('/api/locations', (c) => {
	try {
		const country = c.req.raw.cf?.country || "Unknown";
		const ip = c.req.header('cf-connecting-ip') || "Not Available";

		if (country === "Unknown") {
			return c.json({ error: "Invalid request." }, 404);
		}

		return c.json({ ip, country });
	} catch (e) {
		return c.json({ error: e.message || "Internal Server Error" }, 500);
	}
});

app.get('*', (c) => c.json({ error: "Not found." }, 404));

export default app;
