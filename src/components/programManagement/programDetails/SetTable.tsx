import type { WorkoutSetSingle } from "@/store/features/program/types/newProgram";

interface ExerciseSetProps {
  sets: WorkoutSetSingle[];
}

const SetTable: React.FC<ExerciseSetProps> = ({ sets }) => {
  if (!sets.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue text-white">
            <th className="px-4 py-3 text-center text-xs font-semibold">
              Sets
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold">
              Reps
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold">
              Weight (lbs)
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold">
              Rest
            </th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set, index) => (
            <tr
              key={set.id}
              className={`border-t border-slate-100 text-center ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
            >
              <td className="px-4 py-3 text-sm font-medium text-black">
                {set.sequence}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-black ">
                {set.reps}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-black ">
                {set.weight}
              </td>
              <td className="px-4 py-3 text-sm text-black font-medium ">
                {set.rest}sec
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SetTable;
