import React, { ReactNode } from "react";

interface Iprops {
  header: string[];
  children: ReactNode;
}

const Table = ({ header, children }: Iprops) => {
  return (
    <div className="flex flex-col shadow-xl">
      <div className="overflow-x-auto w-full">
        <div className="p-1.5 max-w-[1200px] mx-auto">
          <div className="border border-gray-200 rounded-xl shadow-sm overflow-x-auto" style={{ maxWidth: "1200px" }}>
            <table
              className="min-w-[1100px] max-w-none divide-y divide-gray-300"
              style={{ minWidth: "1100px" }}
            >
              <thead className="bg-gray-100">
                <tr>
                  {header.map((head, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-black uppercase"
                    >
                      {head}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-black uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-black">{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;