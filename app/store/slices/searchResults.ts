import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";

import { IResult } from "../../../components/Search/SearchResultItem/SearchResultItem";

export interface ISearchResults {
    keyword: string;
    pageLoaded:number;
    data: IResult[];
    totalPages:number;
}

const initialState = {
    keyword: "",
    pageLoaded: 0,
    data: [],
    totalPages: 0
} as ISearchResults;

export const SearchResultsSlice = createSlice({
  name: "search_results",
  initialState,
  reducers: {
    setSearchData: (state: ISearchResults, action: PayloadAction<ISearchResults>) => {
        state.keyword = action.payload.keyword;
        state.pageLoaded = action.payload.pageLoaded;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.search_results.data) {
        return state;
      }
      state.keyword = action.payload.search_results.keyword;
      state.pageLoaded = action.payload.search_results.pageLoaded;
      state.data = action.payload.search_results.data;
      state.totalPages = action.payload.search_results.totalPages;

    },
  },
});

export const selectSearchData = (state: AppState) => state.search_results;
export const { setSearchData } = SearchResultsSlice.actions;
export default SearchResultsSlice.reducer;
