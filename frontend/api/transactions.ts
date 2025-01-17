import { getSecureStorageClient } from "./default";
import { MultiType } from "./type";

export async function get_trxs(
  part?: boolean,
  userId?: number
): Promise<MultiType[] | null> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const param = userId ? `?userId=${userId}` : "";
    const route = `${SAPI}/users/get-trx${param}`;
    const res = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (part) return data.slice(0, 10);

      return data;
    }
  }

  return [];
}
