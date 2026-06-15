import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CommonSelect from "@/common/custom/CommonSelect";
import CommonSwitch from "@/common/custom/CommonSwitch";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { inputClass } from "./BasicInfo";

import {
  next,
  prev,
  updateProgram,
} from "@/store/baseApi/programSlice/program.slice";
import {
  useGetMethodQuery,
  useGetSingleMethodQuery,
} from "@/store/features/program/programAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import EmptyState from "./EmptyState";

export type TrainingDayType = "PUSH" | "PULL" | "LEGS";

export type MuscleGroup =
  | "CHEST"
  | "SHOULDERS"
  | "BACK"
  | "BICEPS"
  | "TRAPS"
  | "QUADS"
  | "HAMSTRINGS"
  | "CALVES"
  | "TRICEPS";

export interface Day {
  dayType: TrainingDayType;
  name: string;
  trainingMethod: string;
  description: string;
  accessories: string[];
  howToExecute: string;
  exerciseHint: string;
  hasBFR: boolean;
  hasAbs: boolean;
  muscleGroups?: MuscleGroup[];
}

export interface Week {
  weekNumber: number;
  trainingDays: string[];
  restDays: string[];
  days: Day[];
}

export interface ProgramSchedule {
  weeks: Week[];
}

const muscleToEnum: Record<string, MuscleGroup> = {
  Chest: "CHEST",
  Shoulders: "SHOULDERS",
  Back: "BACK",
  Biceps: "BICEPS",
  Traps: "TRAPS",
  Quads: "QUADS",
  Hamstrings: "HAMSTRINGS",
  Calves: "CALVES",
  Triceps: "TRICEPS",
};

const dayConfigSchema = z.object({
  day: z.number(),
  focus: z.string().min(1, "Day focus is required"),
  selectedMuscles: z
    .array(z.string())
    .min(1, "Select at least one muscle group"),
  method: z.string().min(1, "Training method is required"),
  description: z.string().min(1, "Description is required"),
  exerciseHint: z.string().min(1, "Exercise hint is required"),
  accessories: z.array(z.object({ value: z.string() })),
  bfr: z.boolean(),
  abs: z.boolean(),
});

const weekSchema = z.object({
  weekNumber: z.number(),
  selectedTrainingDays: z
    .array(z.number())
    .min(1, "Select at least one training day"),
  restDays: z.array(z.number()),
  dayConfigs: z.array(dayConfigSchema),
});

const formSchema = z.object({
  weeks: z.array(weekSchema).min(1, "At least one week is required"),
});

type DayConfig = z.infer<typeof dayConfigSchema>;
type WeekData = z.infer<typeof weekSchema>;
type FormValues = z.infer<typeof formSchema>;

const focusOptions = {
  Push: [
    "Chest",
    "Shoulders",
    "Back",
    "Biceps",
    "Traps",
    "Quads",
    "Hamstrings",
    "Calves",
    "Triceps",
  ],
  Pull: [
    "Chest",
    "Shoulders",
    "Back",
    "Biceps",
    "Traps",
    "Quads",
    "Hamstrings",
    "Calves",
    "Triceps",
  ],
  Leg: [
    "Chest",
    "Shoulders",
    "Back",
    "Biceps",
    "Traps",
    "Quads",
    "Hamstrings",
    "Calves",
    "Triceps",
  ],
};

const defaultMuscles = {
  Push: ["Chest", "Shoulders", "Triceps"],
  Pull: ["Back", "Biceps", "Traps"],
  Leg: ["Quads", "Hamstrings", "Calves"],
};

const createDefaultWeek = (weekNumber: number): WeekData => ({
  weekNumber,
  selectedTrainingDays: [1, 3, 5],
  restDays: [2, 4, 6, 7],
  dayConfigs: [
    {
      day: 1,
      focus: "Push",
      selectedMuscles: ["Chest", "Shoulders", "Triceps"],
      method: "",
      description: "",
      exerciseHint: "Compound Chest Press, Overhead Press, Close-Grip Bench",
      accessories: [{ value: "" }],
      bfr: true,
      abs: true,
    },
    {
      day: 3,
      focus: "Pull",
      selectedMuscles: ["Back", "Biceps", "Traps"],
      method: "",
      description: "",
      exerciseHint: "Barbell Rows, Lat Pulldowns, Face Pulls",
      accessories: [{ value: "" }],
      bfr: true,
      abs: true,
    },
    {
      day: 5,
      focus: "Leg",
      selectedMuscles: ["Quads", "Hamstrings", "Calves"],
      method: "",
      description: "",
      exerciseHint: "Squats, Deadlifts, Calf Raises",
      accessories: [{ value: "" }],
      bfr: true,
      abs: true,
    },
  ],
});

const transformWeeksForStore = (formWeeks: WeekData[]) => {
  return formWeeks.map((week) => ({
    name: `Week ${week.weekNumber}`,
    isPremium: false,
    trainingDays: week.selectedTrainingDays,
    restDays: week.restDays,
    days: week.dayConfigs.map((config) => ({
      dayNumber: config.day,
      dayFocus: config.focus,
      dayFocusMuscle: config.selectedMuscles.map(
        (m) => muscleToEnum[m] ?? m.toUpperCase(),
      ),
      description: config.description,
      trainingMethodId: config.method,
      executeHint: config.exerciseHint,
      accessories: [],
      isEnableBFR: config.bfr,
      isEnableABS: config.abs,
      exercises: [],
    })),
  }));
};

const enumToMuscle: Record<string, string> = {
  CHEST: "Chest",
  SHOULDERS: "Shoulders",
  BACK: "Back",
  BICEPS: "Biceps",
  TRAPS: "Traps",
  QUADS: "Quads",
  HAMSTRINGS: "Hamstrings",
  CALVES: "Calves",
  TRICEPS: "Triceps",
};

const enumToFocus: Record<string, string> = {
  PUSH: "Push",
  PULL: "Pull",
  LEGS: "Leg",
};

const restoreWeeksFromStore = (
  storeWeeks: {
    name: string;
    isPremium: boolean;
    trainingDays: number[];
    restDays: number[];
    days: {
      dayNumber: number;
      dayFocus: string;
      dayFocusMuscle: string[];
      description: string;
      trainingMethodId: string;
      executeHint: string;
      accessories?: string[];
      isEnableBFR: boolean;
      isEnableABS: boolean;
    }[];
  }[],
): WeekData[] =>
  storeWeeks.map((week, i) => ({
    weekNumber: i + 1,
    selectedTrainingDays: week.trainingDays,
    restDays: week.restDays,
    dayConfigs: week.days.map((day) => ({
      day: day.dayNumber,
      focus: enumToFocus[day.dayFocus] ?? day.dayFocus,
      selectedMuscles: day.dayFocusMuscle.map((m) => enumToMuscle[m] ?? m),
      method: day.trainingMethodId,
      description: day.description,
      exerciseHint: day.executeHint,
      // restore string[] → { value: string }[]
      accessories:
        (day.accessories ?? []).length > 0
          ? (day.accessories ?? []).map((a) => ({ value: a }))
          : [{ value: "" }],
      bfr: day.isEnableBFR,
      abs: day.isEnableABS,
    })),
  }));

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className={inputClass.error}>{message}</p> : null;

const DaySplit = () => {
  const { program } = useAppSelector((state) => state.program);
  const { data } = useGetMethodQuery();

  const METHOD_TYPES =
    data?.data?.data.map((method) => ({
      value: method.id,
      label: method.name,
    })) ?? [];

  const methodOptions = METHOD_TYPES;
  const restoredWeeks = program?.weeks?.length
    ? restoreWeeksFromStore(program.weeks)
    : [createDefaultWeek(1)];

  const [savedWeeks, setSavedWeeks] = useState<number[]>(
    program?.weeks?.length ? restoredWeeks.map((w) => w.weekNumber) : [],
  );
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);

  const maxWeeks = 10;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weeks: restoredWeeks,
    },
  });

  const {
    fields: weekFields,
    append: appendWeek,
    remove: removeWeek,
  } = useFieldArray({
    control,
    name: "weeks",
  });

  const weeks = watch("weeks");

  const getDayErrors = (dayIdx: number) =>
    errors.weeks?.[activeWeekIndex]?.dayConfigs?.[dayIdx];

  const handleDayToggle = (weekIdx: number, day: number) => {
    const current = getValues(`weeks.${weekIdx}.selectedTrainingDays`);
    const currentConfigs = getValues(`weeks.${weekIdx}.dayConfigs`);

    const newDays = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day].sort((a, b) => a - b);

    const newRestDays = [1, 2, 3, 4, 5, 6, 7].filter(
      (d) => !newDays.includes(d),
    );

    const newDayConfigs: DayConfig[] = newDays.map((selectedDay, index) => {
      const existing = currentConfigs.find((c) => c.day === selectedDay);
      if (existing) return existing;

      const focusTypes: ("Push" | "Pull" | "Leg")[] = ["Push", "Pull", "Leg"];
      const focusType = focusTypes[index % 3];
      return {
        day: selectedDay,
        focus: focusType,
        selectedMuscles: defaultMuscles[focusType],
        method: methodOptions[index % methodOptions.length].value,
        description: "",
        exerciseHint: "Compound Chest Press, Overhead Press, Close-Grip Bench",
        accessories: [{ value: "" }],
        bfr: true,
        abs: true,
      };
    });

    setValue(`weeks.${weekIdx}.selectedTrainingDays`, newDays);
    setValue(`weeks.${weekIdx}.restDays`, newRestDays);
    setValue(`weeks.${weekIdx}.dayConfigs`, newDayConfigs);
  };

  const handleMuscleToggle = (
    weekIdx: number,
    dayIdx: number,
    focusType: "Push" | "Pull" | "Leg",
    muscle: string,
  ) => {
    const config = getValues(`weeks.${weekIdx}.dayConfigs.${dayIdx}`);

    setValue(`weeks.${weekIdx}.dayConfigs.${dayIdx}.focus`, focusType);

    const already = config.selectedMuscles.includes(muscle);
    const newMuscles = already
      ? config.selectedMuscles.filter((m) => m !== muscle)
      : [...config.selectedMuscles, muscle];

    setValue(
      `weeks.${weekIdx}.dayConfigs.${dayIdx}.selectedMuscles`,
      newMuscles,
    );
  };

  const handleSaveWeek = () => {
    const currentWeekNumber = weeks[activeWeekIndex]?.weekNumber;
    if (!currentWeekNumber) return;

    if (!savedWeeks.includes(currentWeekNumber)) {
      setSavedWeeks((prev) => [...prev, currentWeekNumber]);
    }

    const nextWeekNumber = (weeks.length ?? 0) + 1;
    if (nextWeekNumber <= maxWeeks && weeks.length === activeWeekIndex + 1) {
      appendWeek(createDefaultWeek(nextWeekNumber));
      setActiveWeekIndex(weeks.length);
    }
  };

  const handleRemoveWeek = (weekIdx: number) => {
    removeWeek(weekIdx);

    const newActive = Math.max(
      0,
      activeWeekIndex >= weekIdx ? activeWeekIndex - 1 : activeWeekIndex,
    );

    setActiveWeekIndex(newActive);

    setTimeout(() => {
      const totalWeeks = getValues("weeks").length;

      setSavedWeeks(Array.from({ length: totalWeeks }, (_, i) => i + 1));
    }, 0);
  };

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormValues) => {
    try {
      const weeks = transformWeeksForStore(data.weeks);
      dispatch(updateProgram({ weeks }));
      dispatch(next());
    } catch (error) {
      console.log(" error", error);
    }
  };

  const currentWeek = weeks[activeWeekIndex];
  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [activeDayIndex, setActiveDayIndex] = useState<{
    weekIdx: number;
    dayIdx: number;
  } | null>(null);

  const { data: method } = useGetSingleMethodQuery(selectedMethodId, {
    skip: !selectedMethodId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (method?.data?.data && activeDayIndex) {
      setValue(
        `weeks.${activeDayIndex.weekIdx}.dayConfigs.${activeDayIndex.dayIdx}.description`,
        method.data.data.shortDescription,
      );
    }
  }, [method]);

  if (!program)
    return (
      <div>
        <EmptyState message="Program data is required for Day Split configuration" />
      </div>
    );
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <CommonHeader size="lg">Day Split Configuration</CommonHeader>

          {savedWeeks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {weekFields.map((field, idx) => {
                const weekNum = idx + 1;
                const isSaved = savedWeeks.includes(weekNum);

                return (
                  <button
                    key={field.id}
                    type="button"
                    onClick={() => setActiveWeekIndex(idx)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors cursor-pointer ${
                      activeWeekIndex === idx
                        ? "bg-blue text-white border-blue"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue hover:text-blue"
                    }`}
                  >
                    Week {weekNum}
                    {isSaved && (
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-white/20 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveWeek(idx);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Training Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={inputClass.label}>Training Days Per Week</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`${inputClass.input} flex items-center justify-between cursor-pointer`}
                  >
                    <span>
                      {currentWeek?.selectedTrainingDays
                        .map((d) => d.toString().padStart(2, "0"))
                        .join(", ")}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <DropdownMenuItem
                      key={day}
                      className="flex items-center gap-2"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Checkbox
                        id={`day-${day}`}
                        checked={currentWeek?.selectedTrainingDays.includes(
                          day,
                        )}
                        onCheckedChange={() =>
                          handleDayToggle(activeWeekIndex, day)
                        }
                        className="cursor-pointer data-[state=checked]:bg-blue data-[state=checked]:border-blue [&_svg]:text-white [&_svg]:stroke-white"
                      />
                      <label
                        htmlFor={`day-${day}`}
                        className="flex-1 cursor-pointer"
                      >
                        {day.toString().padStart(2, "0")}
                      </label>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <FieldError
                message={
                  errors.weeks?.[activeWeekIndex]?.selectedTrainingDays?.message
                }
              />
            </div>

            <div>
              <label className={inputClass.label}>Rest day</label>
              <input
                type="text"
                value={currentWeek?.restDays
                  .map((d) => d.toString().padStart(2, "0"))
                  .join(", ")}
                readOnly
                placeholder="Rest days"
                className={inputClass.input}
              />
            </div>
          </div>

          {[...(currentWeek?.dayConfigs ?? [])]
            .map((config, originalIdx) => ({ config, originalIdx }))
            .sort((a, b) => a.config.day - b.config.day)
            .map(({ config, originalIdx: dayIdx }, sortedIndex) => {
              const dayErrors = getDayErrors(dayIdx);

              return (
                <div
                  key={config.day}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#818CF8]/12 text-blue text-sm mr-2">
                        {sortedIndex + 1}
                      </span>
                      Day {config.day.toString().padStart(2, "0")}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Day Focus */}
                    <div>
                      <label className={inputClass.label}>Day Focus</label>
                      <Controller
                        control={control}
                        name={`weeks.${activeWeekIndex}.dayConfigs.${dayIdx}.selectedMuscles`}
                        render={({ field: musclesField }) => {
                          const focusValue = watch(
                            `weeks.${activeWeekIndex}.dayConfigs.${dayIdx}.focus`,
                          );
                          return (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  type="button"
                                  className={`${inputClass.input} flex items-center justify-between cursor-pointer text-left`}
                                >
                                  <span className="truncate">
                                    {`${focusValue}(${musclesField.value.join(", ")})`}
                                  </span>
                                  <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-70">
                                {(["Push", "Pull", "Leg"] as const).map(
                                  (focusType) => (
                                    <DropdownMenuSub key={focusType}>
                                      <DropdownMenuSubTrigger className="cursor-pointer">
                                        {focusType}
                                      </DropdownMenuSubTrigger>
                                      <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                          {focusOptions[focusType].map(
                                            (muscle) => (
                                              <DropdownMenuItem
                                                key={muscle}
                                                className="flex items-center gap-2"
                                                onSelect={(e) =>
                                                  e.preventDefault()
                                                }
                                              >
                                                <Checkbox
                                                  id={`${activeWeekIndex}-${config.day}-${focusType}-${muscle}`}
                                                  checked={musclesField.value.includes(
                                                    muscle,
                                                  )}
                                                  onClick={(e) =>
                                                    e.stopPropagation()
                                                  }
                                                  onCheckedChange={() =>
                                                    handleMuscleToggle(
                                                      activeWeekIndex,
                                                      dayIdx,
                                                      focusType,
                                                      muscle,
                                                    )
                                                  }
                                                  className="cursor-pointer data-[state=checked]:bg-blue data-[state=checked]:border-blue [&_svg]:text-white [&_svg]:stroke-white"
                                                />
                                                <label
                                                  htmlFor={`${activeWeekIndex}-${config.day}-${focusType}-${muscle}`}
                                                  className="flex-1 cursor-pointer"
                                                  onClick={(e) =>
                                                    e.stopPropagation()
                                                  }
                                                >
                                                  {muscle}
                                                </label>
                                              </DropdownMenuItem>
                                            ),
                                          )}
                                        </DropdownMenuSubContent>
                                      </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                  ),
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          );
                        }}
                      />
                      <FieldError
                        message={dayErrors?.selectedMuscles?.message}
                      />
                    </div>

                    {/* Method */}
                    <div>
                      <label className={inputClass.label}>Select Methods</label>
                      <Controller
                        control={control}
                        name={`weeks.${activeWeekIndex}.dayConfigs.${dayIdx}.method`}
                        render={({ field }) => (
                          <CommonSelect
                            item={METHOD_TYPES}
                            value={(field.value || undefined) as string}
                            onValueChange={(val) => {
                              field.onChange(val);
                              setSelectedMethodId(val);
                              setActiveDayIndex({
                                weekIdx: activeWeekIndex,
                                dayIdx,
                              });
                            }}
                            className="w-full"
                            placeholder="Select Method"
                          />
                        )}
                      />
                      <FieldError message={dayErrors?.method?.message} />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className={inputClass.label}>Description</label>
                    <Controller
                      control={control}
                      name={`weeks.${activeWeekIndex}.dayConfigs.${dayIdx}.description`}
                      render={({ field }) => (
                        <textarea
                          rows={2}
                          placeholder="5 sets of 5 heavy reps..."
                          className={inputClass.input}
                          {...field}
                        />
                      )}
                    />
                    <FieldError message={dayErrors?.description?.message} />
                  </div>

                  {/* Exercise Hint */}
                  <div className="mb-4">
                    <label className={inputClass.label}>Exercise Hint</label>
                    <Controller
                      control={control}
                      name={`weeks.${activeWeekIndex}.dayConfigs.${dayIdx}.exerciseHint`}
                      render={({ field }) => (
                        <input
                          type="text"
                          placeholder="Compound Chest Press, Overhead Press, Close-Grip Bench"
                          className={inputClass.input}
                          {...field}
                        />
                      )}
                    />
                    <FieldError message={dayErrors?.exerciseHint?.message} />
                  </div>

                  {/* BFR */}
                  <div className="mb-4">
                    <label className={inputClass.label}>BFR</label>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white">
                      <span className="text-sm text-gray-900">BFR</span>
                      <Controller
                        control={control}
                        name={`weeks.${activeWeekIndex}.dayConfigs.${dayIdx}.bfr`}
                        render={({ field }) => (
                          <CommonSwitch
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* ABS */}
                  <div className="mb-4">
                    <label className={inputClass.label}>ABS</label>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white">
                      <span className="text-sm text-gray-900">ABS</span>
                      <Controller
                        control={control}
                        name={`weeks.${activeWeekIndex}.dayConfigs.${dayIdx}.abs`}
                        render={({ field }) => (
                          <CommonSwitch
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Save Week Button */}
          <div className="flex justify-start">
            <CommonButton
              type="button"
              className="bg-darkPurple"
              onClick={handleSaveWeek}
              disabled={savedWeeks.length >= maxWeeks}
            >
              Save
            </CommonButton>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm text-green-800">
              <span className="font-semibold">Rest Days:</span> days will be
              distributed by Admin throughout the week
            </p>
          </div>

          <div className="flex gap-4">
            <CommonButton variant="secondary" onClick={() => dispatch(prev())}>
              Previous
            </CommonButton>
            <CommonButton type="submit">Next Step</CommonButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DaySplit;
