import SectionHeader from "@/common/button/SectionHeader";
import LoadingStatus from "@/common/custom/LoadingStatus";
import {
  useGetProgramAnalyticsQuery,
  useGetProgramBreakdownQuery,
} from "@/store/features/program/programAPI";

const tableHeaders = [
  { label: "Program Name", align: "text-left" },
  // { label: "Type", align: "text-center xl:table-cell hidden" },
  { label: "Enrolment", align: "text-center md:table-cell hidden" },
  { label: "Active Users", align: "text-center lg:table-cell hidden" },
  { label: "Completion", align: "text-center" },
  // { label: "Revenue", align: "text-center md:table-cell hidden" },
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
  const { data } = useGetProgramAnalyticsQuery();
  const { data: breakdown, isLoading } = useGetProgramBreakdownQuery();

  const program = data?.data;
  const programAnalytics = breakdown?.data ?? [];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-green-600 rounded-xl p-6 text-white`}>
          <p className="text-sm opacity-90 mb-2">Highest Completion Program</p>
          <h3 className="text-2xl font-bold mb-1">
            {program?.highestCompletion?.name}
          </h3>
          <p className="text-sm opacity-90 mb-4">
            {program?.highestCompletion?.enrollments} enrollments
          </p>
          <p className="text-sm opacity-75">
            {program?.highestCompletion?.completionRate}% completion rate
          </p>
        </div>
        <div className={`bg-blue-600  rounded-xl p-6 text-white`}>
          <p className="text-sm opacity-90 mb-2">Most Popular Program</p>
          <h3 className="text-2xl font-bold mb-1">
            {program?.mostPopular?.name}
          </h3>
          <p className="text-sm opacity-90 mb-4">
            {program?.mostPopular?.enrollments} enrollments
          </p>
          <p className="text-sm opacity-75">
            {program?.mostPopular?.completionRate}% completion rate
          </p>
        </div>
      </div>

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
                        {header?.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programAnalytics?.map((program) => (
                    <tr key={program.id} className={tableDesign.tr}>
                      <td className={`${tableDesign?.td}  text-left! `}>
                        {program?.name}
                      </td>

                      <td className={`xl:table-cell hidden ${tableDesign.td}`}>
                        <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
                          {program?.name}
                        </span>
                      </td>

                      <td className={`lg:table-cell hidden ${tableDesign.td}`}>
                        {program?.users?.toLocaleString()}
                      </td>

                      <td className={` ${tableDesign.td}`}>
                        <div className="flex justify-center">
                          <CompletionBar value={program?.completionRate} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramAnalytics;
