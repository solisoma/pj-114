"use client";
import { get_user_status } from "@/api/default";
import Scaffold from "@/components/dashboard/Scaffold";
import { User } from "@/components/dashboard/type";
import { RouteHash } from "@/utils/scaffold";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function Page() {
  const [page, setPage] = useState<string>();
  const params = useSearchParams();
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<User>({});

  async function shallowRoute(page: string) {
    setUser();
    setPage(page);
    history.pushState({ page }, "", `/dashboard?page=${page}`);
  }

  async function setUser() {
    const get_user = await get_user_status();
    setUserDetail(get_user);
  }

  function child(page: string) {
    const Child = RouteHash[page];
    return <Child />;
  }

  useEffect(() => {
    document.title = "Nobleassetsmarket | dashboard";
    const metaDescription = document.querySelector(
      "meta[name='description']"
    ) as HTMLMetaElement;
    if (metaDescription) {
      // metaDescription.content = "One click, big wins";
    }
  }, []);

  useEffect(() => {
    setUser();
    const newPage = params.get("page");
    if (newPage) setPage(newPage);
  }, []);

  if (
    page &&
    ["admin", "wallets"].includes(page) &&
    userDetail.permission === "user"
  ) {
    router.replace("/404");
  } else if (page && Object.keys(RouteHash).includes(page)) {
    return (
      <Scaffold activeLink={page} route={shallowRoute}>
        {userDetail.suspended ? child("suspended") : child(page)}
      </Scaffold>
    );
  } else if (page) {
    router.replace("/404");
    return;
  }
}

export default function RenderHome() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
