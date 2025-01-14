/*eslint-disable */
import { tableHeaders } from "@/utils/product";
import { NumberType } from "@/api/type";
import { cancel_sms, resend_sms } from "@/api/get.number";
import { toast } from "react-toastify";
import { Provider } from "./type";

export const ProductTableContainer = ({
  tableData,
  provider,
  refresh,
}: {
  tableData: NumberType[];
  provider: Provider;
  refresh?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  async function handleActions(action: string, data: NumberType) {
    if (action === "cancel") {
      const cancel = await cancel_sms({
        id: data.id,
        activate_id: data.activation_id,
        provider,
      });

      if (cancel.success) {
        toast.success(cancel.msg);
        refresh!((prev) => !prev);
        return;
      }
      toast.info(cancel.msg);
    } else if (action === "resend") {
      const resend = await resend_sms({
        id: data.id,
        activate_id: data.activation_id,
        provider,
      });

      if (resend.success) {
        toast.success(resend.msg);
        return;
      }
      toast.info(resend.msg);
    }
  }

  return (
    <div className="w-full overflow-x-scroll live-trade-table border md:overflow-y-scroll md:h-[70%]">
      <table className="w-full border border-gray-400">
        <thead className="px-2 border-b w-full">
          <tr>
            {tableHeaders.map((header, ind) => (
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
          {tableData.map((data) => {
            return (
              <tr
                className="hover:bg-background3 border border-gray-400"
                key={data.id}
              >
                <td className="py-4 px-1 h-16 border border-gray-400 md:w-[5%] md:px-2 md:h-20">
                  {data.id}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.phone_number}
                </td>
                <td className="py-4 px-1 border text-center border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.status === "awaiting" ? (
                    <span className="loader"></span>
                  ) : (
                    data.code
                  )}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.country}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.service}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.status}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.cost}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.provider.charAt(0).toUpperCase() +
                    data.provider.slice(1).toLowerCase()}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-center md:w-[8%] md:px-2">
                  <div className="flex items-center justify-between gap-2 w-full text-sm md:text-lg md:justify-around">
                    {data.status === "awaiting" ? (
                      <>
                        <button
                          onClick={() => handleActions("resend", data)}
                          disabled={!data.code || !data.resend}
                          className={`${
                            !data.code || !data.resend
                              ? "cursor-not-allowed bg-tex"
                              : "bg-yellow-400"
                          } text-sm rounded-lg p-2`}
                        >
                          Resend
                        </button>
                        <button
                          onClick={() => handleActions("cancel", data)}
                          className="bg-btn text-sm rounded-lg p-2"
                        >
                          Refund
                        </button>
                      </>
                    ) : (
                      <button className="bg-btn text-sm rounded-lg p-2">
                        No action
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
