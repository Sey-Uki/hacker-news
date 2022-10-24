import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type CommentItem = {
  by: string;
  id: number;
  kids?: number[];
  parent?: number;
  time: number;
  text: string;
};

type CommentsState = {
  listOfComments: CommentItem[];
};

const initialState: CommentsState = {
  listOfComments: [],
};

export const getComment = createAsyncThunk<CommentItem[], number[]>(
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

    return resolvedComments;
  }
);

export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.listOfComments = action.payload;
    });
  },
});

export const selectComments = (state: RootState) =>
  state.comments.listOfComments;

export const commentsReducer = comments.reducer;
