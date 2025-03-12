"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  clearSecureStorage,
  decrypt,
  getSecureStorage,
  setSecureStorage,
} from "@/api/auth";
import { log_out, refreshToken } from "@/api/default";
import { AuthGuardType } from "./type";

function AuthGuard({ children }: AuthGuardType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authenticated, setAuthenticated] = useState(false);

  async function authorize(path: string) {
    try {
      let active = await getSecureStorage("token");
      if (!active || !active.token) {
        const hash = searchParams.get("r_id");
        if (hash) {
          const data = await decrypt(decodeURIComponent(hash));
          if (!data.ttl || Date.now() > data.ttl) throw new Error("expired");
          await setSecureStorage("token", data.id);
        } else {
          localStorage.setItem("path", path);
          router.push("/account/sign-in?q=f");
          return;
        }
      } else {
        if (
          Date.now() > active.tokenExpires ||
          String(active.tokenExpires).length === 16
        ) {
          try {
            await refreshToken();
          } catch {
            // await log_out();
            await clearSecureStorage();
            localStorage.setItem("path", path);
            router.push("/account/sign-in?q=f");
            return;
          }
        }
      }
    } catch (e) {
      localStorage.setItem("path", path);
      router.push("/account/sign-in?q=f");
      return;
    }
    setAuthenticated(true);
  }
  useEffect(() => {
    const path = `${window.location.pathname}${window.location.search}`;
    authorize(path);
  }, []);
  return authenticated ? children : null;
}

export default function RenderAuthGuard({ children }: AuthGuardType) {
  return (
    <Suspense>
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
}
