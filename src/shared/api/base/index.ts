import ky from "ky";
import { API_URL } from "../../config";
import type {
  GetRequest,
  PostRequest,
  PutRequest,
  PatchRequest,
  DeleteRequest,
} from "./model";

const api = ky.create({
  prefixUrl: API_URL,
});

export const http = {
  get: ({ path, options }: GetRequest) => api.get(path, options).json(),
  post: ({ path, body, options }: PostRequest) =>
    api.post(path, { json: body, ...options }).json(),
  put: ({ path, body, options }: PutRequest) =>
    api.put(path, { json: body, ...options }).json(),
  patch: ({ path, body, options }: PatchRequest) =>
    api.patch(path, { json: body, ...options }).json(),
  delete: ({ path, options }: DeleteRequest) =>
    api.delete(path, options).json(),
} as const;
