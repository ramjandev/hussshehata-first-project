import ActionButton from "@/common/button/ActionButton";
import { formatDate } from "@/lib/help";
import type { TrainingDaySingle } from "@/store/features/program/types/newProgram";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuDumbbell } from "react-icons/lu";
import { MdModeEdit } from "react-icons/md";
import DayUpdateModal from "./DayUpdateModal";
import ExerciseCard from "./ExerciseCard";

interface DayProps {
  day: TrainingDaySingle;
}

const DayCard: React.FC<DayProps> = ({ day }) => {
  const [open, setOpen] = useState(true);
  const [selectedDay, setSelectedDay] = useState<TrainingDaySingle | null>(
    null,
  );

  const isRest = day.exercises.length === 0;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 px-5 py-4">
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="flex flex-1 items-center gap-3 text-left cursor-pointer"
          >
            <span className="text-sm font-bold text-slate-900">
              Day {day.dayNumber}
            </span>
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-bold text-white bg-blue display-inline-block`}
            >
              {day.dayFocus}
            </span>

            <div className="">
              <p>Created {formatDate(day.createdAt)}</p>
            </div>
            {!isRest && (
              <IoIosArrowDown
                className={`ml-auto text-2xl cursor-pointer  transition-transform duration-300 ${open ? "rotate-180 text-blue" : "text-slate-400"}`}
              />
            )}
          </div>

          {!isRest && (
            <ActionButton
              title="Update Workout"
              variant="add"
              onClick={() => setSelectedDay(day)}
            >
              <LuDumbbell className="size-5" />
            </ActionButton>
          )}

          {isRest && (
            <button
              onClick={() => setSelectedDay(day)}
              className="ml-auto flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <MdModeEdit className="text-sm" />
            </button>
          )}
        </div>

        {isRest && (
          <div className="border-t border-slate-100 px-5 py-3">
            <p className="text-sm text-slate-400">
              {day.executeHint || "Recovery & adaption"}
            </p>
          </div>
        )}

        {!isRest && (
          <div
            className={`grid transition-all duration-300 ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-3 border-t border-slate-100 px-5 pb-5 pt-4">
                {day.exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <DayUpdateModal
        isOpen={!!selectedDay}
        defaultValues={selectedDay}
        onClose={() => setSelectedDay(null)}
      />
    </>
  );
};

export default DayCard;
