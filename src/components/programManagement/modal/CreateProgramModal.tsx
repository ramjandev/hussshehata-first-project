import CloseButton from "@/common/button/CloseButton";
import CommonHeader from "@/common/header/CommonHeader";
import {
  closeProgramModal,
  setStep,
} from "@/store/baseApi/programSlice/program.slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import StepIndicator from "./StepIndicator";
import AddExercises from "./step/AddExercises";
import BasicInfo from "./step/BasicInfo";
import DaySplit from "./step/DaySplit";
import Review from "./step/Review";

const CreateProgramModal = () => {
  const { step } = useAppSelector((state) => state.program);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(closeProgramModal());
    dispatch(setStep(1));
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <CommonHeader
            onClick={() => dispatch(setStep(1))}
            size="lg"
            className="text-gray-900"
          >
            Create New Program
          </CommonHeader>

          <CloseButton action={closeModal} />
        </div>

        <div className="p-6">
          <StepIndicator />

          {step === 1 && <BasicInfo />}

          {step === 2 && <DaySplit />}

          {step === 3 && <AddExercises />}

          {step === 4 && (
            <div className="space-y-6">
              <Review />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProgramModal;
