import { getSecureStorageClient } from "./default";
import { MultiType } from "./type";

export async function get_trxs(
  part?: boolean,
  userId?: number
): Promise<MultiType[] | null> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const param = userId ? `userId=${userId}` : "";
    const route = `${SAPI}/users/get-trx?category=all&${param}`;
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

      // console.log(data);
      return data;
    }
  }

  return [];
}

export async function get_withdrawals(
  userId?: number
): Promise<MultiType[] | null> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const param = userId ? `userId=${userId}` : "";
    const route = `${SAPI}/users/get-trx?category=withdrawal&${param}`;
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

export async function get_Deposits(
  userId?: number
): Promise<MultiType[] | null> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const param = userId ? `userId=${userId}` : "";
    const route = `${SAPI}/users/get-trx?category=deposit&${param}`;
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

export async function get_referrals(): Promise<MultiType[] | null> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/users/referrals`;
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

export async function deposit(
  details: MultiType
): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/users/deposit`;
    const res = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(details),
    });
    if (res.ok) {
      return await res.json();
    }
  }

  return false;
}

export async function transfer(
  details: MultiType
): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/users/transfer`;
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

export async function withdraw(
  details: MultiType
): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/users/withdraw`;
    const res = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(details),
    });
    if (res.ok) {
      return await res.json();
    }
  }

  return false;
}

export async function add_wallet(
  details: MultiType
): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");
  const { id, ...maindet } = details;
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/wallet`;
    const res = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(maindet),
    });
    if (res.status === 204) {
      return true;
    }
  }

  return false;
}

export async function get_wallet(): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/wallet`;
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

export async function update_wallet(
  details: MultiType
): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/wallet`;
    const res = await fetch(route, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(details),
    });
    if (res.ok) {
      return await res.json();
    }
  }

  return false;
}

export async function delete_wallet(id: number): Promise<MultiType | boolean> {
  const token = await getSecureStorageClient("token");
  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/wallet/${id}`;
    const res = await fetch(route, {
      method: "DELETE",
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

export async function sendProof(id: number, proof: File) {
  const token = await getSecureStorageClient("token");
  const formData = new FormData();
  formData.append("file", proof);
  formData.append("id", String(id));

  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/users/deposit/proof`;
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

export async function get_owner_wallet(name: string) {
  const token = await getSecureStorageClient("token");

  if (token) {
    const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
    const route = `${SAPI}/my-wallet?name=${name}`;
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
