import React, { useEffect, useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { HeaderWrapper } from "../number/HeaderWrapper";
import { ContentPage } from "../number/ContentPage";
import { AiOutlineUser } from "react-icons/ai";
import { AdminUserTable } from "./AdminUserTable";
import { User } from "../type";
import { get_all_users, get_ms_balance, get_sms_balance } from "@/api/admin";

function Admin() {
  const [showUser, setShowUser] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [singleUser, setSingleUser] = useState<User>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>();
  const [balance, setBalance] = useState<number>();
  const [hermesBalance, setHermesBalance] = useState<number>();

  async function getProducts() {
    const users = await get_all_users();
    setUsers(users);
    setSelectedUsers(users);
  }

  async function getBalance() {
    const loki_bal = await get_sms_balance();
    const hermes_bal = await get_ms_balance();
    setBalance(loki_bal);
    setHermesBalance(hermes_bal);
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
    getBalance();
    getProducts();
  }, []);

  if (!showUser)
    return (
      <PageWrapper>
        <div className="h-full">
          <div className="flex flex-col items-start md:items-center md:justify-between px-4 w-full md:flex-row mb-4">
            <HeaderWrapper
              header={
                <div>
                  <p className="text-xl font-bold md:text-2xl">Admin</p>
                  <div className="flex gap-4">
                    <p className="text-sm md:text-base">
                      <span className="text-sm font-bold md:text-base">
                        Lokimobile:
                      </span>{" "}
                      ₽{balance ? balance : "...."}
                    </p>
                    <p className="text-sm md:text-base">
                      <span className="text-sm font-bold md:text-base">
                        Hermes:
                      </span>{" "}
                      ₽{hermesBalance ? hermesBalance : "...."}
                    </p>
                  </div>
                </div>
              }
            />
            <input
              type="text"
              onChange={(e) => filterUser(e.target.value)}
              placeholder="search"
              className="outline-none w-full text-white p-2 border border-gray-400 rounded-lg bg-background2 md:w-[50%]"
            />
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
                className="w-full h-[4rem] border border-gray-400 rounded-lg flex gap-4 items-center justify-start px-4 py-4 cursor-pointer"
              >
                <AiOutlineUser size={30} />
                <p className="text-xl">{user.name}</p>
              </div>
            ))}
          </ContentPage>
        </div>
      </PageWrapper>
    );
  return <AdminUserTable setShowUser={setShowUser} user={singleUser!} />;
}

export default Admin;
