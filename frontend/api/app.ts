import { getSecureStorageClient } from "./default";
import { MultiType } from "./type";

export async function get_investment(): Promise<MultiType[]> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/plan`;
    const res = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
  }

  return [];
}

export async function get_copy(): Promise<MultiType[]> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/copytrade`;
    const res = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
  }

  return [];
}
