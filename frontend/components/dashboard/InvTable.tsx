/*eslint-disable */
import { invHead } from "@/utils/table";

export const InvTable = ({ tableData }: { tableData: any }) => {
  return (
    <div
      className={`w-full overflow-x-scroll live-trade-table border md:overflow-y-scroll md:h-full ${
        !tableData.length && "remove-scrollbar"
      }`}
    >
      <table className="w-full border border-gray-400">
        <thead className="px-2 border-b w-full">
          <tr>
            {invHead.map((header, ind) => (
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
          {tableData.map((data: any) => {
            return (
              <tr
                className="hover:bg-background3 border border-gray-400"
                key={data.id}
              >
                <td className="py-4 px-1 h-16 border border-gray-400 md:w-[5%] md:px-2 md:h-20">
                  {data.id}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.amount}
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  running
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.roi}%
                </td>
                <td className="py-4 px-1 h-16 border border-gray-400 md:w-[5%] md:px-2 md:h-20">
                  {data.duration} days
                </td>
                <td className="py-4 px-1 border border-gray-400 text-sm md:text-sm md:w-[8%] md:px-2">
                  {data.created_at}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
