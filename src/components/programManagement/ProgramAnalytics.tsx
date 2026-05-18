import SectionHeader from "@/common/button/SectionHeader";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import { useGetProgramAnalyticsQuery } from "@/store/features/program/programAPI";
import { useState } from "react";

const tableHeaders = [
  { label: "Program Name", align: "text-left" },
  { label: "Type", align: "text-center xl:table-cell hidden" },
  { label: "Enrolment", align: "text-center md:table-cell hidden" },
  { label: "Active Users", align: "text-center lg:table-cell hidden" },
  { label: "Completion", align: "text-center" },
  { label: "Revenue", align: "text-center md:table-cell hidden" },
  { label: "Trend", align: "text-center sm:table-cell hidden" },
];

const CompletionBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="flex items-center gap-2">
    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-sm text-gray-600">{value}%</span>
  </div>
);

export const tableDesign = {
  table:
    "w-full border-separate border-spacing-0 border border-[#EEF2FF] rounded-lg overflow-hidden",
  thead: "bg-[#EEF2FF] text-black",
  tbody: "text-[#101828]",
  tr: "",
  th: "text-center! py-3 px-4 text-sm font-bold text-black border-b border-r border-[#EEF2FF] first:rounded-tl-lg last:rounded-tr-lg",
  td: "text-center! py-3 px-4 text-sm text-[#101828] border-b border-r border-[#EEF2FF] last:border-r-0",
};

const ProgramAnalytics = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProgramAnalyticsQuery({
    page,
  });

  const programAnalytics = data?.data?.data?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programAnalytics.slice(0, 2).map((program, index) => (
          <div
            key={index}
            className={`${index % 2 === 0 ? "bg-blue-600" : "bg-green-600"} rounded-xl p-6 text-white`}
          >
            <p className="text-sm opacity-90 mb-2">Program Name</p>
            <h3 className="text-2xl font-bold mb-1">{program.name}</h3>
            <p className="text-sm opacity-90 mb-4">
              {program.enrollments} enrollments
            </p>
            <p className="text-sm opacity-75">
              {program.completionRate}% completion rate
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <SectionHeader
          title="Enrollment Programs"
          description="By enrollments and completion rate"
        />

        <div className="space-y-4">
          {programAnalytics.map((program, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {program.name}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {program.activeUsers} users
                  </span>
                  <span className="text-sm text-gray-500">
                    {program.completedCount}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  style={{ width: `${program.completionRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Performance Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <SectionHeader
          title="Program Performance Breakdown"
          description="Detailed metrics for each program"
        />
        <LoadingStatus
          isLoading={isLoading}
          items={programAnalytics}
          itemName="program analytics"
        />

        {!isLoading && programAnalytics.length > 0 && (
          <>
            <div className="w-full overflow-x-auto">
              <table className={tableDesign.table}>
                <thead className={tableDesign.thead}>
                  <tr className={tableDesign.tr}>
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className={`
                    ${tableDesign.th}
                    ${header.align}  ${index === 0 ? "text-left!" : ""}
                  `}
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programAnalytics.map((program) => (
                    <tr key={program.id} className={tableDesign.tr}>
                      <td className={`${tableDesign.td}  text-left! `}>
                        {program.name}
                      </td>

                      <td className={`xl:table-cell hidden ${tableDesign.td}`}>
                        <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
                          {program.type}
                        </span>
                      </td>

                      <td className={`md:table-cell hidden ${tableDesign.td}`}>
                        {program.enrollments.toLocaleString()}
                      </td>

                      <td className={`lg:table-cell hidden ${tableDesign.td}`}>
                        {program.activeUsers.toLocaleString()}
                      </td>

                      <td className={` ${tableDesign.td}`}>
                        <div className="flex justify-center">
                          <CompletionBar value={program.completionRate} />
                        </div>
                      </td>

                      <td className={`md:table-cell hidden ${tableDesign.td}`}>
                        ${program.estimatedRevenue.toLocaleString()}
                      </td>

                      <td
                        className={` sm:table-cell hidden  ${tableDesign.td}`}
                      >
                        <p
                          className={`${program.trend === "DECLINING" ? "text-red-500" : "text-green-500"}`}
                        >
                          {program.trendIcon}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="py-5">
              <Pagination
                currentPage={page}
                totalPages={data?.data?.data.meta.totalPages || 1}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramAnalytics;
