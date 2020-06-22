import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from "./routes/index.routes.ts";

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

await app.listen({ port: 8000 });
