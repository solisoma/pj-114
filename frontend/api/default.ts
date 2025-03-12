import { getSecureStorage, setSecureStorage } from "./auth";
import { ChangePasswordType, MultiType, SignUpMessageType } from "./type";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const SigUpMessages: SignUpMessageType = {
  Conflict: "Email already used",
};

export async function refreshToken(): Promise<MultiType> {
  const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
  const URL = `${SAPI}/auth/refresh`;
  const token = await getSecureStorage("token");

  const req = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.refreshToken}`,
    },
  });

  if (req.status !== 200) throw new Error("Token unable to refresh");

  const data: MultiType = await req.json();
  token.token = data.token;
  token.refreshToken = data.refreshToken;
  token.tokenExpires = data.tokenExpires;
  await setSecureStorage("token", token);
  return token;
}

export async function getSecureStorageClient(
  name: string
): Promise<MultiType | undefined> {
  let token = await getSecureStorage(name);
  if (Date.now() > token.tokenExpires) {
    try {
      token = await refreshToken();
    } catch {
      location.replace("/account/sign-in");
      return;
    }
  }
  return token;
}

export async function log_out() {
  const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
  const URL = `${SAPI}/auth/logout`;
  const token = await getSecureStorageClient("token");

  const req = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.token}`,
    },
  });

  if (req.status !== 204) throw new Error("Failed");
  return true;
}

export async function sign_up(details: MultiType, router: AppRouterInstance) {
  const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
  const URL = `${SAPI}/auth/register`;

  const req = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (req.status !== 204)
    throw new Error(SigUpMessages[req.statusText] || "An error occurred");
  const { email, password } = details;
  const signInDetails = { email, password };
  try {
    await sign_in(signInDetails);
  } catch {
    router.push("/account/sign-in");
  }
  return req.status;
}

export async function sign_in(details: MultiType) {
  const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
  const URL = `${SAPI}/auth/login`;

  const req = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (req.status !== 200)
    throw new Error(
      "Invalid username or password. Verify your credentials and try again."
    );
  const token = await req.json();
  await setSecureStorage("token", token);
  return req.status;
}

export async function confirm_email(hash: string) {
  const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
  const URL = `${SAPI}/auth/confirm-email`;

  const req = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hash }),
  });
  if (req.status !== 204) throw new Error("Email not connfirmed");
  return true;
}

export async function change_password({
  current_password,
  new_password,
  confirm_password,
}: ChangePasswordType) {
  const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
  const token = await getSecureStorageClient("token");
  const url = new URL(`${SAPI}/users/change-password`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token!.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: current_password,
        newPassword: new_password,
        confirmNewPassword: confirm_password,
      }),
    });
    // console.log(response.status);
    if (response.status !== 204) return false;
    return true;
  } catch (error) {
    console.error("Error uploading file:", error);
    return false;
  }
}

export async function get_user_status(): Promise<MultiType> {
  const SAPI = process.env.NEXT_PUBLIC_SAPI_URL;
  const token = await getSecureStorageClient("token");
  const url = new URL(`${SAPI}/auth/status`);
  const user_status = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.token}`,
    },
  });

  if (user_status.status !== 200) throw new Error("An error occurred");
  const data = await user_status.json();
  return data;
}
