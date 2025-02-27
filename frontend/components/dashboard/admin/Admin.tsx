import React, { useEffect, useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { ContentPage } from "./ContentPage";
import { AiOutlineUser } from "react-icons/ai";
import { AdminUserTable } from "./AdminUserTable";
import { User } from "../type";
import { get_all_users } from "@/api/admin";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";

function Admin() {
  const [showUser, setShowUser] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [singleUser, setSingleUser] = useState<User>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>();

  async function getProducts() {
    const users = await get_all_users();
    setUsers(users);
    setSelectedUsers(users);
  }

  function filterUser(text: string) {
    if (users) {
      const regex = new RegExp(text, "ig");
      const newData = users.filter((user) => user.name.match(regex));
      setSelectedUsers([...newData]);
    }
  }

  function setUser(user: User) {
    setSingleUser(user);
    setShowUser(true);
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (!showUser)
    return (
      <PageWrapper>
        <div className="h-full pt-8">
          <div className="flex flex-col items-start gap-4 md:items-center md:justify-between px-4 w-full md:flex-row mb-4">
            <a
              className="p-2 bg-background2 w-full font-bold rounded-lg md:w-auto text-center md:hidden"
              href="/dashboard?page=wallets"
            >
              My wallets
            </a>
            <input
              type="text"
              onChange={(e) => filterUser(e.target.value)}
              placeholder="search"
              className="outline-none w-full text-white p-2 border border-gray-400 rounded-lg bg-black  md:w-[50%]"
            />
            <a
              className="p-2 hidden bg-background2 w-full font-bold rounded-lg md:w-auto text-center md:block"
              href="/dashboard?page=wallets"
            >
              My wallets
            </a>
          </div>
          <ContentPage
            flexType="flex-col gap-4"
            width="w-full"
            height="h-[78%] overflow-y-auto md:h-[87%]"
            px="px-4"
          >
            {selectedUsers?.map((user) => (
              <div
                onClick={() => setUser(user)}
                className="w-full h-[4rem] border border-gray-400 rounded-lg flex gap-4 items-center justify-between px-4 py-4 cursor-pointer"
              >
                <div className="flex gap-1 items-center">
                  <AiOutlineUser size={30} />
                  <p className="text-xl">{user.name}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.navigator.clipboard.writeText(user.email);
                    toast.success("User email copied to clipboard");
                  }}
                  className="p-1"
                >
                  <FaRegCopy size={17} color="white" />
                </button>
              </div>
            ))}
          </ContentPage>
        </div>
      </PageWrapper>
    );
  return <AdminUserTable setShowUser={setShowUser} user={singleUser!} />;
}

export default Admin;
