import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";


export interface IBookmark {
    id: number,
    name: string,
    backdrop_path: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[]
}

export interface IBookmarkData {
    data: IBookmark[]
}

const initialState = {
    data: [],
} as IBookmarkData;

export const BookmarkSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        setDataBookmarks: (state: IBookmarkData, action: PayloadAction<IBookmark>) => {
            state.data.push({...action.payload});
        },
        removeDataBookmarks: (state: IBookmarkData, action: PayloadAction<{ id: number }>) => {
            state.data.splice(state.data.findIndex(item => item.id === action.payload.id), 1)
        }
    },
    extraReducers: {
      [HYDRATE]: (state, action) => {
        if (!action.payload.bookmarks.data) {
          return state;
        }
        state.data.push({...action.payload.bookmarks});  
      },
    },
  });

export const selectBookmarkData = (state: AppState) => state.bookmarks;
export const { setDataBookmarks, removeDataBookmarks } = BookmarkSlice.actions;
export default BookmarkSlice.reducer;