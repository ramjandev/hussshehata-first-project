import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import { useGetallProgramQuery } from "@/store/features/program/programAPI";
import ProgramCard from "../reuseable/ProgramCard";

const HomePageContent = () => {
  const { data, isLoading } = useGetallProgramQuery({});
  const programs = data?.data?.data || [];
  const list = new Array(10).fill(null);
  return (
    <div>
      <div className="space-y-4">
        {isLoading ? (
          list.map((_, index) => <DashboardCardSkeleton key={index} />)
        ) : programs.length > 0 ? (
          programs.map((program) => (
            <div className="bg-white rounded-lg border border-[#E7E8EB] p-4 sm:p-6">
              <ProgramCard
                key={program.id}
                id={program.id}
                title={program.name}
                category={program.status}
                position={2}
                icon={
                  <div className="flex  items-center text-gray-400 gap-0.5 ">
                    <div className="text-xs">↑</div>
                    <div className="text-xs">↓</div>
                  </div>
                }
                iconAction={() => {}}
              />
            </div>
          ))
        ) : (
          <p className=" text-center"> No programs found</p>
        )}
      </div>
    </div>
  );
};

export default HomePageContent;
