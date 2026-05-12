import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/button/SectionHeader";
import { closeProgramModal } from "@/store/baseApi/programSlice/program.slice";
import { useCreateProgramMutation } from "@/store/features/program/programAPI";
import { useAppDispatch, useAppSelector } from "@/store/hook";

const Review = () => {
  const { program } = useAppSelector((state) => state.program);

  const [createProgram, { isLoading }] = useCreateProgramMutation();

  const dispatch = useAppDispatch();

  console.log("program", program);
  const handlePublish = async () => {
    try {
      if (!program) return;

      await createProgram(program).unwrap();

      dispatch(closeProgramModal());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    program && (
      <div className="">
        <div className="">
          <SectionHeader
            title="Review & Publish"
            description="Review your program details before publishing..."
          />

          <div className="">
            {/* Program Information */}
            <div className="mb-6 p-4 border border-blue rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Program Information
              </h3>

              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-sm text-gray-600 min-w-[80px]">
                    Name:
                  </span>

                  <span className="text-sm text-gray-900">{program.name}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-sm text-gray-600 min-w-[80px]">
                    Duration:
                  </span>

                  <span className="text-sm text-gray-900">
                    {program.weeks.length} weeks
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="text-sm text-gray-600 min-w-[80px]">
                    Description:
                  </span>

                  <span className="text-sm text-gray-900">
                    {program.description}
                  </span>
                </div>

                {!!program.features?.length && (
                  <div className="flex items-start">
                    <span className="text-sm text-gray-600 min-w-[80px]">
                      Features:
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {program.features.map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded bg-[#F3F0FF] text-gray-900"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!!program.tags?.length && (
                  <div className="flex items-start">
                    <span className="text-sm text-gray-600 min-w-[80px]">
                      Tags:
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {program.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded bg-[#F3F0FF] text-gray-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Weeks */}
            <div className="border border-blue rounded-lg p-4">
              {program.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="">
                  <h3 className="text-base font-semibold text-gray-900 border-b border-[#A78BFA]/50 pb-2.5">
                    {week.name}
                  </h3>

                  <div className="space-y-2 mt-2 text-sm">
                    <div>
                      <span className="text-gray-600">Premium:</span>

                      <span className="text-gray-900 ml-1">
                        {week.isPremium ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-600">Training Days:</span>

                      <span className="text-gray-900 ml-1">
                        {week.trainingDays.join(", ")}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-600">Rest Days:</span>

                      <span className="text-gray-900 ml-1">
                        {week.restDays.join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Days */}
                  {week.days.map((day, _dayIndex) => (
                    <div
                      key={`week-${weekIndex}-day-${day.dayNumber}`}
                      className="mb-6 p-4 border-b border-[#A78BFA]/50"
                    >
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900">
                            Day {day.dayNumber}: {day.dayFocus}
                          </h4>
                        </div>

                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="text-gray-600">
                              Focus Muscles:
                            </span>

                            <span className="text-gray-900 ml-1">
                              {day.dayFocusMuscle.join(", ")}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-600">Description:</span>

                            <span className="text-gray-900 ml-1">
                              {day.description}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-600">
                              Training Method:
                            </span>

                            <span className="text-gray-900 ml-1">
                              {day.trainingMethodId}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-600">Execute Hint:</span>

                            <span className="text-gray-900 ml-1">
                              {day.executeHint}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-600">BFR Enabled:</span>

                            <span className="text-gray-900 ml-1">
                              {day.isEnableBFR ? "Yes" : "No"}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-600">ABS Enabled:</span>

                            <span className="text-gray-900 ml-1">
                              {day.isEnableABS ? "Yes" : "No"}
                            </span>
                          </div>

                          {/* Exercises */}
                          <div className="space-y-4 mt-4">
                            {day.exercises.map((exercise, exerciseIndex) => (
                              <div
                                key={exerciseIndex}
                                className="border border-[#A78BFA]/30 rounded-lg p-3"
                              >
                                <div>
                                  <span className="text-gray-600">
                                    Exercise:
                                  </span>

                                  <span className="text-gray-900 ml-1">
                                    {exercise.name}
                                  </span>
                                </div>

                                <div>
                                  <span className="text-gray-600">Type:</span>

                                  <span className="text-gray-900 ml-1">
                                    {exercise.exerciseType}
                                  </span>
                                </div>

                                <div>
                                  <span className="text-gray-600">For:</span>

                                  <span className="text-gray-900 ml-1">
                                    {exercise.exerciseFor}
                                  </span>
                                </div>

                                {exercise.description && (
                                  <div>
                                    <span className="text-gray-600">
                                      Description:
                                    </span>

                                    <span className="text-gray-900 ml-1">
                                      {exercise.description}
                                    </span>
                                  </div>
                                )}

                                <div>
                                  <span className="text-gray-600">
                                    Default Set:
                                  </span>

                                  <span className="text-gray-900 ml-1">
                                    {exercise.defaultSet}
                                  </span>

                                  <span className="text-gray-600 ml-3">
                                    Default Reps:
                                  </span>

                                  <span className="text-gray-900 ml-1">
                                    {exercise.defaultReps}
                                  </span>
                                </div>

                                {/* Workout Sets */}
                                <div className="mt-3 space-y-2">
                                  {exercise.sets.map((set, setIndex) => (
                                    <div
                                      key={setIndex}
                                      className="flex flex-wrap gap-3 text-sm"
                                    >
                                      <div>
                                        <span className="text-gray-600">
                                          Set:
                                        </span>

                                        <span className="text-gray-900 ml-1">
                                          {set.sequence}
                                        </span>
                                      </div>

                                      <div>
                                        <span className="text-gray-600">
                                          Weight:
                                        </span>

                                        <span className="text-gray-900 ml-1">
                                          {set.weight}
                                        </span>
                                      </div>

                                      <div>
                                        <span className="text-gray-600">
                                          Reps:
                                        </span>

                                        <span className="text-gray-900 ml-1">
                                          {set.reps}
                                        </span>
                                      </div>

                                      <div>
                                        <span className="text-gray-600">
                                          Rest:
                                        </span>

                                        <span className="text-gray-900 ml-1">
                                          {set.rest}s
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <CommonButton variant="secondary">Previous</CommonButton>

            <CommonButton onClick={handlePublish}>
              {isLoading ? (
                <ButtonWithLoading title="Publishing" />
              ) : (
                "Publish Program"
              )}
            </CommonButton>
          </div>
        </div>
      </div>
    )
  );
};

export default Review;
