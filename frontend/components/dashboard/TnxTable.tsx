/*eslint-disable */
import { tnxHead } from "@/utils/table";

export const TnxTable = ({ tableData }: { tableData: any }) => {
  return (
    <div className="w-full overflow-x-scroll remove-scrollbar live-trade-table border border-[#292B37] rounded-lg">
      <table className="min-w-full border-collapse">
        <thead className="rounded-lg">
          <tr className="text-[1rem] bg-[#292B37]">
            {tnxHead.map((header, ind) => (
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
          {tableData.map((data: any, i: number) => {
            return (
              <tr
                className={`${
                  i % 2 != 0 ? "bg-[#20232A]" : "bg-[--background]"
                }  md:text-[1.3vw]`}
                key={data.id}
              >
                <td className="px-6 py-2 md:px-[2vw] md:py-[.7vw]">
                  {tableData.length - i}
                </td>
                <td className="text-sm pr-6 md:pr-[2vw]">{data.service}</td>
                <td className="text-sm pr-6 md:pr-[2vw]">{data.amount}</td>
                <td className="text-sm pr-6 md:pr-[2vw]">{data.status}</td>
                <td className="text-sm pr-6 md:pr-[2vw]">{data.category}</td>
                <td className="text-sm pr-6 md:pr-[2vw] whitespace-nowrap">
                  {new Date(data.created_at).toLocaleDateString("en-US", {
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
    </div>
  );
};
