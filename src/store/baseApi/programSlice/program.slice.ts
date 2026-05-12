import type { ProgramPayload } from "@/store/features/program/types/newProgram";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProgramState {
  isProgramModalOpen: boolean;
  step: number;
  program: ProgramPayload | null;
}

const initialState: ProgramState = {
  isProgramModalOpen: false,
  step: 1,
  program: null,
};

const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    openProgramModal: (state) => {
      state.isProgramModalOpen = true;
    },
    closeProgramModal: (state) => {
      state.isProgramModalOpen = false;
    },
    next: (state) => {
      state.step += 1;
    },
    prev: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateProgram: (state, action: PayloadAction<Partial<ProgramPayload>>) => {
      state.program = {
        ...state.program,
        ...action.payload,
      } as ProgramPayload;
    },
  },
});

export const {
  openProgramModal,
  closeProgramModal,
  setStep,
  updateProgram,
  next,
  prev,
} = programSlice.actions;

export default programSlice.reducer;
