/*eslint-disable */
import { adminTableHeaders } from "@/utils/product";
import { PageWrapper } from "../PageWrapper";
import { HeaderWrapper } from "../number/HeaderWrapper";
import { User } from "../type";
import { useEffect, useRef, useState } from "react";
import {
  change_user_status,
  get_trxs,
  get_user,
  update_balance,
} from "@/api/admin";
import { Actions, MultiType } from "@/api/type";
import { get_admin_action } from "@/utils/admin";
import Modal from "../Modal";
import UpdateBalance, { AdminActions } from "../Utils";
import { FormikValues } from "formik";
import { toast } from "react-toastify";

export const AdminUserTable = ({
  setShowUser,
  user,
}: {
  setShowUser: (param: boolean) => void;
  user: User;
}) => {
  const [trxs, setTrxs] = useState<MultiType[]>([]);
  const [m_user, setMUser] = useState<User>();
  const [modalDetails, setModalDetails] = useState<{
    show: boolean;
    type: string;
  }>({
    show: false,
    type: "delete",
  });
  const [actions, setActions] = useState<{ label: string; value: string }[]>(
    []
  );
  const actionRef = useRef<HTMLSelectElement>(null);

  async function getTrx() {
    const transactions = await get_trxs(user.id);
    setTrxs(transactions!);
  }

  function showAction(value: string) {
    if (["user", "admin"].includes(value)) {
      setModalDetails({ show: true, type: "permission" });
    } else if (["activate", "suspend"].includes(value)) {
      setModalDetails({ show: true, type: "status" });
    } else {
      setModalDetails({ show: true, type: "balance" });
    }
  }

  async function getUser() {
    const usr = await get_user(user.id);
    setMUser(usr!);
  }

  async function updatePermission() {
    const cmd =
      m_user!.permission === "admin" ? Actions.ToUser : Actions.ToAdmin;
    const change_perm = await change_user_status({
      userId: user.id,
      action: cmd,
    });
    if (!change_perm) throw new Error();
    if (actionRef.current) actionRef.current.value = "";
    setModalDetails((prev) => {
      return { ...prev, show: false };
    });
    getUser();
  }

  async function updateStatus() {
    const cmd = m_user!.suspended ? Actions.Activate : Actions.Suspend;
    const change_status = await change_user_status({
      userId: user.id,
      action: cmd,
    });
    if (!change_status) throw new Error();
    if (actionRef.current) actionRef.current.value = "";
    setModalDetails((prev) => {
      return { ...prev, show: false };
    });
    getUser();
  }

  async function modifyBalance(values: FormikValues, closeModal: () => void) {
    try {
      const direction = values.isAdd ? "receive" : "send";
      const modify = await update_balance({
        amount: values.amount,
        userId: m_user!.id,
        direction,
      });
      if (!modify) throw new Error();
      if (actionRef.current) actionRef.current.value = "";
      closeModal();
      getUser();
      getTrx();
      toast.success(`Balance modified successfully`);
    } catch {
      toast.error(`Balance modificationn failed`);
    }
  }

  useEffect(() => {
    if (m_user) {
      const getAction = get_admin_action(m_user.suspended, m_user.permission);
      setActions(getAction);
    }
  }, [m_user]);

  useEffect(() => {
    getTrx();
    getUser();
  }, []);

  if (m_user)
    return (
      <PageWrapper>
        <div className="flex items-center justify-between px-4 w-full">
          <HeaderWrapper
            header={
              <div>
                <p className="text-sm md:text-base">{m_user.name}</p>
                <p className="text-sm md:text-base">₦{m_user.balance}</p>
              </div>
            }
          />
          <div className=" flex items-center justify-end gap-6 w-full">
            <button
              onClick={() => setShowUser(false)}
              className="bg-btn p-2 rounded-lg text-white w-[8rem]"
              type="submit"
            >
              Go back
            </button>
            <select
              ref={actionRef}
              onChange={(e) => showAction(e.target.value)}
              className="outline-none p-2 border border-gray-400 text-white bg-background2 rounded-lg w-[50%]"
            >
              <option value="">Actions</option>
              {actions.map((action) => {
                return <option value={action.value}> {action.label}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="w-full h-[90%] overflow-auto live-trade-table border md:h-[73vh] text-white">
          <table className="w-full border border-gray-400">
            <thead className="px-2 border-b w-full">
              <tr>
                {adminTableHeaders.map((header, ind) => (
                  <th
                    className="text-left p-2 border text-sm md:text-base border-gray-400"
                    key={ind}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full border border-gray-400">
              {trxs.map((trx) => {
                return (
                  <tr
                    className="hover:bg-background3 border border-gray-400"
                    key={trx.id}
                  >
                    <td className="py-4 px-1 h-16 border border-gray-400 md:w-[5%] md:px-2 md:h-20">
                      {trx.id}
                    </td>
                    <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                      {trx.service}
                    </td>
                    <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                      {trx.amount}
                    </td>
                    <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                      {trx.status}
                    </td>
                    <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                      {trx.created_at}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal
            show={modalDetails.show}
            setShow={(show) => {
              setModalDetails((prev) => {
                return { ...prev, show };
              });
            }}
            classes="bg-background2 w-[80%] h-[40%] shadow-2xl md:p-[.1vw] rounded-lg md:w-[30%]"
          >
            {modalDetails.type === "permission" ? (
              <AdminActions
                command={modalDetails.type}
                onAction={updatePermission}
              />
            ) : modalDetails.type === "status" ? (
              <AdminActions
                command={modalDetails.type}
                onAction={updateStatus}
              />
            ) : (
              <UpdateBalance onAction={modifyBalance} />
            )}
          </Modal>
        </div>
      </PageWrapper>
    );
};
