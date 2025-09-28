import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import generateRoute from "./routes/generate";

const app = new OpenAPIHono();

app.route("/generate", generateRoute);

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});
