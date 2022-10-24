import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type CommentItem = {
  id: number;
  time: number;
  type: string;
  text?: string;
  by?: string;
  kids?: number[];
  parent: number;
  deleted?: boolean;
};

type CommentsState = {
  listOfComments: CommentItem[];
};

const initialState: CommentsState = {
  listOfComments: [],
};

export const getComments = createAsyncThunk<CommentItem[], number[]>(
  "news/getComment",
  async (idsOfComments) => {
    const promises = idsOfComments.map((id: number) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
    );

    const comments = await Promise.all(promises);
    const resolvedComments = await Promise.all(
      comments.map(async (item) => await item.json())
    );

    return resolvedComments as CommentItem[];
  }
);

export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.listOfComments = action.payload;
    });
  },
});

export const selectComments = (state: RootState) =>
  state.comments.listOfComments;

export const commentsReducer = comments.reducer;
