import CommonButton from "@/common/button/CommonButton";
import CommonSwitch from "@/common/custom/CommonSwitch";
import CommonHeader from "@/common/header/CommonHeader";
import {
  useAllProgramLockToggleMutation,
  useSingleProgramLockToggleMutation,
} from "@/store/features/content/essentialManagement";
import type { ProgramLockStatusData } from "@/store/features/content/types/programLock";
import { type FC } from "react";
import { CgLockUnlock } from "react-icons/cg";

interface WeekCardProps {
  program: ProgramLockStatusData;
  selectedProgramId: string;
}
const WeekCard: FC<WeekCardProps> = ({ program, selectedProgramId }) => {
  const [allProgramLockToggle] = useAllProgramLockToggleMutation();
  const [singleProgramLockToggle] = useSingleProgramLockToggleMutation();

  const toggleLockAll = async (data: { lock: boolean }) => {
    if (!selectedProgramId) return;
    try {
      await allProgramLockToggle({
        id: selectedProgramId,
        data,
      });
    } catch (error) {
      console.error("Toggle lock failed:", error);
    } finally {
    }
  };

  const toggleWeekPremium = async (
    data: { lock: boolean },
    programId: string,
    weekNumber: number,
  ) => {
    try {
      if (programId === selectedProgramId) {
        await singleProgramLockToggle({
          data,
          id: programId,
          week: weekNumber,
        });
      }
    } catch (error) {
      console.error("Toggle week lock failed:", error);
    } finally {
    }
  };
  return (
    <div className="pt-6 ">
      <div className="flex justify-between items-center mb-8">
        <CommonHeader
          size="sm"
          className="text-[#101828]! font-semibold! line-clamp-1"
        >
          Week-by-Week Lock Configuration
        </CommonHeader>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-sm text-gray-600 ">Lock All</span>
          <CommonSwitch
            checked={program.isPremium}
            onChange={() => toggleLockAll({ lock: !program.isPremium })}
          />
        </div>
      </div>

      <div className=" flex  flex-wrap gap-5">
        {program.weeks.map((week) => (
          <div
            key={week.weekId}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all w-full  sm:w-60 ${
              week.isPremium
                ? "border-purple-300 bg-purple-50"
                : "border-gray-300 bg-white"
            }`}
            onClick={() =>
              toggleWeekPremium(
                { lock: !week.isPremium },
                program.programId,
                week.weekNumber,
              )
            }
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">Week {week.weekNumber}</span>
              {week.isPremium && (
                <CgLockUnlock size={20} className="text-purple-600" />
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {week.isPremium ? "Premium" : "Free"}
            </p>
          </div>
        ))}
      </div>
      <div className=" flex justify-end mt-6">
        <CommonButton>Save Week Configuration</CommonButton>
      </div>
    </div>
  );
};

export default WeekCard;
