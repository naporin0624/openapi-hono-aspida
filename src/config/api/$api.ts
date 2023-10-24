import type { AspidaClient, BasicHeaders } from "aspida";
import type { Methods as Methods_by08hd } from ".";
import type { Methods as Methods_10ychcb } from "./route2";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (
    baseURL === undefined ? "http://localhost/api" : baseURL
  ).replace(/\/$/, "");
  const PATH0 = "/route2";
  const GET = "GET";

  return {
    route2: {
      /**
       * / の内容をそのまま返します
       * @returns 成功です
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods_10ychcb["get"]["resBody"],
          BasicHeaders,
          Methods_10ychcb["get"]["status"]
        >(prefix, PATH0, GET, option).json(),
      /**
       * / の内容をそのまま返します
       * @returns 成功です
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods_10ychcb["get"]["resBody"],
          BasicHeaders,
          Methods_10ychcb["get"]["status"]
        >(prefix, PATH0, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    /**
     * @hono/openapi-zod はすごい！
     * @returns 成功時のレスポンスは success: true です！
     */
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods_by08hd["get"]["resBody"],
        BasicHeaders,
        Methods_by08hd["get"]["status"]
      >(prefix, "", GET, option).json(),
    /**
     * @hono/openapi-zod はすごい！
     * @returns 成功時のレスポンスは success: true です！
     */
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods_by08hd["get"]["resBody"],
        BasicHeaders,
        Methods_by08hd["get"]["status"]
      >(prefix, "", GET, option)
        .json()
        .then((r) => r.body),
    $path: () => `${prefix}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
