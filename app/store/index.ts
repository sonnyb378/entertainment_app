import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, Context } from "next-redux-wrapper";
import { Store } from "redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storage from "../../lib/persistStorage";

import authReducer from "./slices/auth";
  
const reducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["", ""],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

const setUpStore = (context: Context) => makeStore;

export type AppStore = ReturnType<typeof setUpStore>;

export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(makeStore);

export type AppState = ReturnType<AppStore["getState"]>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(setUpStore);

