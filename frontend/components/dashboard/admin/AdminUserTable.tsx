/*eslint-disable */
import { adminTableHeaders } from "@/utils/table";
import { PageWrapper } from "../PageWrapper";
import { User } from "../type";
import { useEffect, useRef, useState } from "react";
import { change_user_status, get_user, update_balance } from "@/api/admin";
import { Actions, MultiType } from "@/api/type";
import { get_admin_action } from "@/utils/admin";
import Modal from "../Modal";
import UpdateBalance, { AdminActions } from "../Utils";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { get_trxs } from "@/api/transactions";
import UpdateTrx from "./UpdateTrx";
import InfoBox from "./InfoBox";
import { HiOutlineHome } from "react-icons/hi";

export const AdminUserTable = ({
  setShowUser,
  user,
}: {
  setShowUser: (param: boolean) => void;
  user: User;
}) => {
  const [trxs, setTrxs] = useState<MultiType[]>([]);
  const [initialValue, setInitialValue] = useState<MultiType>();
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
    const transactions = await get_trxs(false, user.id);
    setTrxs(transactions!);
  }

  function showAction(value: string) {
    if (["user", "admin"].includes(value)) {
      setModalDetails({ show: true, type: "permission" });
    } else if (["a-kyc", "r-kyc"].includes(value)) {
      setModalDetails({ show: true, type: "kyc" });
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

  async function updateKyc() {
    const cmd = m_user!.isVerified ? Actions.NotVerify : Actions.Verify;
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
      const getAction = get_admin_action(m_user.isVerified, m_user.permission);
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
        <div className="flex items-center gap-x-1 pb-2">
          <HiOutlineHome
            className="cursor-pointer text-white text-[5vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.5vw] xl:text-[1.2vw] flex-shrink-0"
            onClick={() => setShowUser(false)}
          />
          <p className="font-medium text-white text-[5vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.4vw] xl:text-[1.2vw] leading-none">
            {` / ${m_user.name}`}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 bg-[#0F0F0F] rounded-lg px-3 py-8 md:flex-row md:flex-wrap">
            <div className="w-full lg:w-[48%]">
              <InfoBox
                header="Name"
                desc={`${m_user?.name ? m_user?.name : ""}`}
              />
            </div>
            <div className="w-full lg:w-[48%]">
              <InfoBox
                header="Balance"
                desc={`$${
                  m_user?.balance
                    ? new Intl.NumberFormat().format(m_user?.balance!)
                    : ""
                }`}
              />
            </div>
            <div className="w-full lg:w-[48%]">
              <InfoBox
                header="Front Image"
                desc={
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      m_user.front_image
                        ? `${process.env.NEXT_PUBLIC_SAPI_URL}/static/${m_user.front_image}`
                        : "#"
                    }
                    className="text-background2 underline"
                  >
                    {m_user.front_image ? "open" : "No image"}
                  </a>
                }
              />
            </div>
            <div className="w-full lg:w-[48%]">
              <InfoBox
                header="Back Image"
                desc={
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      m_user.back_image
                        ? `${process.env.NEXT_PUBLIC_SAPI_URL}/static/${m_user.back_image}`
                        : "#"
                    }
                    className="text-background2 underline"
                  >
                    {m_user.back_image ? "open" : "No image"}
                  </a>
                }
              />
            </div>
            <div className="flex gap-4 items-center font-semibold md:w-[48%]">
              <select
                ref={actionRef}
                onChange={(e) => showAction(e.target.value)}
                className="outline-none p-2 border border-gray-400 text-white bg-[#0F0F0F] rounded-lg w-full"
              >
                <option value="">Actions</option>
                {actions.map((action) => {
                  return <option value={action.value}> {action.label}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="w-full overflow-x-scroll remove-scrollbar live-trade-table border border-[#292B37] rounded-lg">
            <table className="min-w-full border-collapse">
              <thead className="rounded-lg">
                <tr className="text-[1rem] bg-[#292B37]">
                  {adminTableHeaders.map((header, ind) => (
                    <th
                      className="text-left pr-6 md:pr-[2vw] py-2 first:pl-6 first:md:pl-[2vw] md:py-[.7vw]"
                      key={ind}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trxs.map((trx, i) => {
                  return (
                    <tr
                      className={`${
                        i % 2 != 0 ? "bg-[#20232A]" : "bg-[--background]"
                      }  md:text-[1.3vw]`}
                      key={trx.id}
                    >
                      <td
                        onClick={() => {
                          if (
                            !["withdrawal", "deposit"].includes(trx.category)
                          ) {
                            toast.info(
                              "You are not allowed to modify this transactions status"
                            );
                            return;
                          }
                          setInitialValue(trx);
                          setModalDetails({
                            show: true,
                            type: "update-status",
                          });
                        }}
                        className="px-6 py-2 md:px-[2vw] md:py-[.7vw]"
                      >
                        {i + 1}
                      </td>
                      <td className="text-sm pr-6 md:pr-[2vw]">
                        {trx.service}
                      </td>
                      <td className="text-sm pr-6 md:pr-[2vw]">{trx.amount}</td>
                      <td className="text-sm pr-6 md:pr-[2vw]">
                        {trx.category}
                      </td>
                      <td className="text-sm pr-6 md:pr-[2vw]">{trx.status}</td>
                      <td className="text-sm pr-6 md:pr-[2vw]">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            trx.proof
                              ? `${process.env.NEXT_PUBLIC_SAPI_URL}/static/${trx.proof}`
                              : "#"
                          }
                          className="underline text-background2"
                        >
                          {trx.proof ? "open" : "no proof"}
                        </a>
                      </td>
                      <td className="text-sm pr-6 md:pr-[2vw] whitespace-nowrap">
                        {new Date(trx.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
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
              classes={`bg-[#1E222D] ${
                modalDetails.type === "balance" ? "md:w-[30%]" : "md:w-[25%]"
              } h-[40%] shadow-2xl md:p-[.1vw] rounded-lg w-[80%]`}
            >
              {modalDetails.type === "permission" ? (
                <AdminActions
                  command={modalDetails.type}
                  onAction={updatePermission}
                />
              ) : modalDetails.type === "kyc" ? (
                <AdminActions
                  command={modalDetails.type}
                  onAction={updateKyc}
                />
              ) : modalDetails.type === "update-status" ? (
                <UpdateTrx initialValue={initialValue!} onAction={getTrx} />
              ) : (
                <UpdateBalance onAction={modifyBalance} />
              )}
            </Modal>
          </div>
        </div>
      </PageWrapper>
    );
};
