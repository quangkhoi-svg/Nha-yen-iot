export const API_URL = "http://localhost:4000/api";

// Hàm fetch API có kèm token
export async function api(path, opts = {}) {
  const token = localStorage.getItem("token");
  return fetch(API_URL + path, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).then((r) => r.json());
}
