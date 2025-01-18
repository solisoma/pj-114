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

export async function uploadKyc(details: MultiType) {
  const token = await getSecureStorageClient("token");
  const formData = new FormData();
  formData.append("front", details.front);
  formData.append("back", details.back);

  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/users/kyc`;
    const res = await fetch(route, {
      method: "POST",
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

export async function create_plan(details: MultiType) {
  const token = await getSecureStorageClient("token");

  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/plan/subscribe`;
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

export async function create_copyplan(details: MultiType) {
  const token = await getSecureStorageClient("token");

  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/copytrade/subscribe`;
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
