import CommonHeader from "@/common/header/CommonHeader";
import type { WeekSingle } from "@/store/features/program/types/newProgram";
import { useState, type FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DayCard from "./DayCard";

interface WeekProps {
  week: WeekSingle;
  index: number;
}

const WeekCard: FC<WeekProps> = ({ week, index }) => {
  const [open, setOpen] = useState(index === 0);

  const totalExercises = week.days.reduce(
    (acc, day) => acc + day.exercises.length,
    0,
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple text-white shadow-md shadow-indigo-200">
            {index + 1}
          </div>
          <div>
            <CommonHeader className="font-bold! text-black!">
              {week.name}
            </CommonHeader>
            <CommonHeader size="sm">
              {week.trainingDays.length} Training Days · {totalExercises}{" "}
              Exercises
            </CommonHeader>
          </div>
        </div>
        <span className="cursor-pointer">
          <IoIosArrowDown
            className={`text-3xl   transition-transform duration-300 ${open ? "rotate-180 text-blue" : "text-slate-400"}`}
          />
        </span>
      </div>

      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-slate-100 p-5">
            {week.days.map((day) => (
              <DayCard key={day.id} day={day} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekCard;
