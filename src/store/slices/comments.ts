import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  initialState: {},
  reducers: {},
});

export const commentsReducer = comments.reducer;
