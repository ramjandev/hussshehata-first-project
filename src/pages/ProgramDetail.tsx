import Spinner from "@/common/custom/Spinner";
import CommonHeader from "@/common/header/CommonHeader";
import WeekCard from "@/components/programManagement/programDetails/WeekCard";
import {
  useDeleteProgramMutation,
  useSingleProgramQuery,
} from "@/store/features/program/programAPI";
import type { Programme } from "@/store/features/program/types/newProgram";
import { Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const DAY_NAMES = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function focusStyle(focus: string): string {
  const f = focus.toLowerCase();
  if (f.includes("push"))
    return "bg-orange-100 text-orange-700 border border-orange-200";
  if (f.includes("pull"))
    return "bg-sky-100 text-sky-700 border border-sky-200";
  if (f.includes("leg"))
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  if (f.includes("rest"))
    return "bg-slate-800 text-white border border-slate-700";
  return "bg-slate-100 text-slate-600 border border-slate-200";
}

export function muscleChip(m: string): string {
  const map: Record<string, string> = {
    Chest: "bg-rose-50 text-rose-500 border border-rose-200",
    Shoulders: "bg-amber-50 text-amber-600 border border-amber-200",
    Biceps: "bg-purple-50 text-purple-600 border border-purple-200",
    Back: "bg-indigo-50 text-indigo-600 border border-indigo-200",
    Triceps: "bg-orange-50 text-orange-600 border border-orange-200",
    Quads: "bg-teal-50 text-teal-600 border border-teal-200",
  };
  return map[m] ?? "bg-slate-50 text-slate-500 border border-slate-200";
}

const ProgramDetail = () => {
  const { programId } = useParams<{ programId: string }>();

  const { data, isLoading } = useSingleProgramQuery(programId!, {
    refetchOnMountOrArgChange: true,
    skip: !programId,
  });

  const p = data?.data?.data as unknown as Programme;

  const totalTrainingDays =
    p?.weeks?.reduce((acc, week) => acc + week.trainingDays.length, 0) || 0;

  const totalRestDays =
    p?.weeks?.reduce((acc, week) => acc + week.restDays.length, 0) || 0;

  const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      if (!programId) return;
      await deleteProgram(programId).unwrap();
      navigate("/dashboard/program-management");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : p ? (
        <div className="min-h-screen ">
          <div className="relative overflow-hidden rounded-2xl bg-purple p-8 text-white shadow-xl mb-6">
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex-1 w-full">
                <div className="flex justify-between">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                      {p.status}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                        p.isActive
                          ? "bg-emerald-400/20 text-emerald-100"
                          : "bg-red-400/20 text-red-100"
                      }`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div onClick={handleDelete} className="flex shrink-0 gap-2">
                    <button
                      disabled={isDeleting}
                      className="flex items-center gap-1.5 rounded-lg bg-red-500/80 border border-red-400/30 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="text-base" />
                    </button>
                  </div>
                </div>

                <CommonHeader size="4xl" className="text-white!">
                  {p.name}
                </CommonHeader>
                <CommonHeader size="md" className="text-white!">
                  {p.description}
                </CommonHeader>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5 w-full ">
                  {[
                    { label: "Weeks", value: p.weeks?.length || 0 },
                    { label: "Training Days", value: totalTrainingDays },
                    { label: "Rest Days", value: totalRestDays },
                    { label: "Fitness Level", value: "Intermediate" },
                    { label: "Fitness Level", value: "Intermediate" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl  bg-[#A78BFA] p-3">
                      <p className="text-xs text-white mb-6">{item.label}</p>
                      <p className="text-xl font-bold ">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[...(p.weeks ?? [])]
              .sort((a, b) => {
                const numA = parseInt(a.name.replace(/\D+/g, ""));
                const numB = parseInt(b.name.replace(/\D+/g, ""));
                return numA - numB;
              })
              .map((week, index) => (
                <WeekCard key={week.id} week={week} index={index} />
              ))}
            {/* {p.weeks?.map((week, index) => (
              <WeekCard key={week.id} week={week} index={index} />
            ))} */}
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-lg text-slate-500">Program not found</p>
        </div>
      )}
    </div>
  );
};

export default ProgramDetail;
