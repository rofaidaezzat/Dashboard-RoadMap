
import React from 'react';

const SkeletonTable = () => {
  const rows = Array.from({ length: 10 });

  return (
    <div className="flex flex-col mt-10 pt-10 animate-pulse">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {['id', 'title', 'Likes', 'Views'].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      {header}
                    </th>
                  ))}
                  <th scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((_, i) => (
                  <tr key={i} className="odd:bg-white even:bg-gray-100">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 text-end">
                      <div className="flex justify-end gap-2">
                        <div className="h-8 w-8 bg-[#523a77] rounded-md" />
                        <div className="h-8 w-8  bg-red-600 rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;
