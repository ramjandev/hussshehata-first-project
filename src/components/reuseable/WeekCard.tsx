import CommonSwitch from "@/common/custom/CommonSwitch";
import CommonHeader from "@/common/header/CommonHeader";
import {
  useAllPremiumToggleMutation,
  usePremiumToggleMutation,
} from "@/store/features/program/programAPI";
import type { WeekBody } from "@/store/features/program/types/exercise";
import type { WeekSingle } from "@/store/features/program/types/newProgram";
import { type FC } from "react";
import { CgLockUnlock } from "react-icons/cg";

interface WeekCardProps {
  singleWeek: WeekSingle[];
  selectedProgramId: string;
}
const WeekCard: FC<WeekCardProps> = ({ singleWeek, selectedProgramId }) => {
  const [toggleWeekPremium] = usePremiumToggleMutation();

  const [allToggleWeekPremium] = useAllPremiumToggleMutation();

  const toggleWeek = async (data: WeekBody, weekId: string) => {
    try {
      await toggleWeekPremium({ weekId: weekId, data });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAllWeek = async (data: { status: boolean }) => {
    try {
      if (selectedProgramId) {
        await allToggleWeekPremium({ programmeId: selectedProgramId, data });
      }
    } catch (error) {
      console.error(error);
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
            checked={singleWeek.every((week) => week.isPremium)}
            onChange={() => {
              toggleAllWeek({
                status: !singleWeek.every((week) => week.isPremium),
              });
            }}
          />
        </div>
      </div>

      <div className=" flex  flex-wrap gap-5">
        {singleWeek.map((week) => (
          <div
            key={week.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all w-full  sm:w-60 ${
              week.isPremium
                ? "border-purple-300 bg-purple-50"
                : "border-gray-300 bg-white"
            }`}
            onClick={() =>
              toggleWeek(
                { isPremium: !week.isPremium, name: week.name },
                week.id,
              )
            }
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{week.name}</span>
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
    </div>
  );
};

export default WeekCard;
