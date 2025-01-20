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

export async function update_wallet(
  details: MultiType
): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");
  const formData = new FormData();
  formData.append("qrcode", details.qrcode);
  formData.append("id", String(details.id));
  formData.append("name", String(details.name));
  formData.append("address", String(details.address));

  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/my-wallet`;
    const res = await fetch(route, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      body: formData,
    });
    if (res.ok) {
      return true;
    }
  }

  return false;
}

export async function update_trx(
  details: MultiType
): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");

  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/users/update/trx`;
    const res = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(details),
    });
    if (res.ok) {
      return true;
    }
  }

  return false;
}

export async function get_all_wallet() {
  const token = await getSecureStorageClient("token");

  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/my-wallet/all`;
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

  return false;
}
