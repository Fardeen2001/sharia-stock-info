import { ParsedUrlQuery } from "querystring";

declare global {
  type PageProps<T extends ParsedUrlQuery = ParsedUrlQuery> = {
    params: T;
  };
}
