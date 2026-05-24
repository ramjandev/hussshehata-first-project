import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import {
  useGetallProgramQuery,
  useSingleProgramQuery,
} from "@/store/features/program/programAPI";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import ProgramCard from "../reuseable/ProgramCard";
import WeekCard from "../reuseable/WeekCard";

const Premium = () => {
  const { data } = useGetallProgramQuery({});
  const programs = data?.data?.data ?? [];

  const [selectedProgramId, setSelectedProgramId] = useState<string>("");

  const { data: singleProgram, isLoading: singleProgramLoading } =
    useSingleProgramQuery(selectedProgramId, {
      skip: !selectedProgramId,
      refetchOnMountOrArgChange: true,
    });

  const weeks = singleProgram?.data?.data?.weeks ?? [];

  return (
    <div>
      <div className="space-y-4">
        {programs.map((program) => (
          <div
            className="bg-white rounded-lg border border-[#E7E8EB] p-4 sm:p-6"
            key={program.id}
          >
            <ProgramCard
              id={program.id}
              title={program.name}
              status={program.status}
              icon={
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  {selectedProgramId === program.id ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
              }
              iconAction={() => {
                setSelectedProgramId(program.id);
              }}
            />

            {selectedProgramId === program.id && (
              <>
                {singleProgramLoading ? (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-6 gap-4 w-full">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <DashboardCardSkeleton key={idx} />
                    ))}
                  </div>
                ) : (
                  <WeekCard
                    singleWeek={weeks}
                    selectedProgramId={selectedProgramId}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
