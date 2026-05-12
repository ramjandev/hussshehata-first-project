import { setStep } from "@/store/baseApi/programSlice/program.slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { ChevronRight } from "lucide-react";
import React from "react";
const StepIndicator = () => {
  const { step: currentStep } = useAppSelector((state) => state.program);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-center mb-8">
      {[
        { num: 1, label: "Basic Info" },
        { num: 2, label: "Day Split" },
        { num: 3, label: "Add Exercises" },
        { num: 4, label: "Review" },
      ].map((step, index) => (
        <React.Fragment key={step.num}>
          <div
            onClick={() => {
              dispatch(setStep(step.num));
            }}
            key={step.num}
            className="flex items-center  cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium  ${
                currentStep === step.num
                  ? "bg-darkBlue text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.num}
            </div>
            <span
              className={`ml-2 text-sm ${currentStep === step.num ? "text-purple font-medium" : "text-gray-500"}`}
            >
              {step.label}
            </span>
          </div>
          {index < 3 && <ChevronRight className="w-4 h-4 text-gray-400 mx-4" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
