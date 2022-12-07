import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";


export interface IUrl {
    currentUrl: string;
}

const initialState = {
    currentUrl: "/movies"
} as IUrl;

export const UrlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setCurrentUrl: (state: IUrl, action: PayloadAction<IUrl>) => {
      state.currentUrl = action.payload.currentUrl;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.url.currentUrl) {
        return state;
      }
      state.currentUrl = action.payload.url.currentUrl;
    },
  },
});

export const selectCurrentUrl = (state: AppState) => state.url;
export const { setCurrentUrl } = UrlSlice.actions;
export default UrlSlice.reducer;
