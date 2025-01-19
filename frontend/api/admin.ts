import { getSecureStorageClient } from "./default";
import { ChangeUserStatusType, MultiType, UpdateBalanceType } from "./type";

const origin = process.env.NEXT_PUBLIC_SAPI_URL;

export async function get_all_users(): Promise<MultiType[]> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const route = `${origin}/users/all-users`;
    const res = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (res.ok) return await res.json();
  }
  return [];
}

export async function get_user(userId: number): Promise<MultiType | null> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const route = `${origin}/users/get-user?userId=${userId}`;
    const res = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (res.ok) return await res.json();
  }

  return null;
}

export async function update_balance(
  details: UpdateBalanceType
): Promise<boolean> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const route = `${origin}/users/update-balance`;
    const res = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({ ...details }),
    });
    if (res.ok) return true;
  }

  return false;
}

export async function change_user_status(
  details: ChangeUserStatusType
): Promise<boolean> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const route = `${origin}/users/change-user-status`;
    const res = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(details),
    });
    if (res.ok) return true;
  }

  return false;
}
