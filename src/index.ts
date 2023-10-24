import { OpenAPIHono, RouteHandler, createRoute } from "@hono/zod-openapi";
import { MiddlewareHandler, Context } from "hono";
import { z } from "zod";
import { prettyJSON } from "hono/pretty-json";
import aspida, { FetchConfig } from "@aspida/fetch";
import api from "./config/api/$api";

type Bindings = {
  SELF_SERVICE: Fetcher;
};

type Variables = {
  client: ReturnType<typeof createClient>;
};

type HonoEnv = {
  Bindings: Bindings;
  Variables: Variables;
};

const createClient = (env: Bindings, config?: FetchConfig) =>
  api(
    aspida(
      (...args: Parameters<typeof fetch>) => env.SELF_SERVICE.fetch(...args),
      config,
    ),
  );
const clientMiddleware: MiddlewareHandler<HonoEnv> = (c, next) => {
  const client = createClient(c.env, {
    baseURL: new URL("/", c.req.url).href,
  });
  c.set("client", client);

  return next();
};

const route = createRoute({
  path: "/",
  method: "get",
  description: "@hono/openapi-zod はすごい！",
  responses: {
    200: {
      description: "成功時のレスポンスは success: true です！",
      content: {
        "application/json": {
          schema: z.object({ success: z.literal(true) }),
        },
      },
    },
  },
});
const handler: RouteHandler<typeof route, HonoEnv> = (c) => {
  return c.json({ success: true });
};

const route2 = createRoute({
  path: "/route2",
  method: "get",
  description: "/ の内容をそのまま返します",
  responses: {
    200: {
      description: "成功です",
      content: {
        "application/json": {
          schema: z.object({ success: z.literal(true) }),
        },
      },
    },
  },
});
const handler2: RouteHandler<typeof route2, HonoEnv> = async (c) => {
  const res = await c.get("client").$get();
  return c.jsonT(res);
};

const app = new OpenAPIHono<HonoEnv>();

app.use("*", clientMiddleware);
app.use("/doc/*", prettyJSON());

app.doc("/doc", {
  openapi: "3.0.3",
  info: { title: "openapi doc", version: "0.0.1" },
  servers: [{ url: "/api" }],
});

app.openapi(route, handler);
app.openapi(route2, handler2);

export default app;
