import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./baseApi/auth/auth.slice";
import { baseAPI } from "./baseApi/baseApi";
import programReducer from "./baseApi/programSlice/program.slice";

// Persist configs
const authPersistConfig = {
  key: "auth",
  storage,
};

const programPersistConfig = {
  key: "program",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedProgramReducer = persistReducer(
  programPersistConfig,
  programReducer,
);

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: persistedAuthReducer,
    program: persistedProgramReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
