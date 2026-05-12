interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
}

const ResponsiveTable = <T,>({ data, columns }: TableProps<T>) => {
  return (
    // Wrapper div for horizontal scrolling
    <div className="block w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="table-auto min-w-[800px] text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor as string}
                scope="col"
                className="px-6 py-3 whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.accessor as string}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
