import { getSecureStorageClient } from "./default";
import { Chat, PartnerPreview } from "./type";

export async function get_chat_history(
  senderId: number,
  recvId: number
): Promise<Chat[]> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/chat/history?user1=${senderId}&user2=${recvId}`;
    const res = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();

      return data;
    }
  }

  return [];
}

export async function get_chat_recent(
  userId: number
): Promise<PartnerPreview[]> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/chat/recent/${userId}`;
    const res = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();

      return data;
    }
  }

  return [];
}
