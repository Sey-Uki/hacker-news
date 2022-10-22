import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const URL =
  "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";

export type NewsItem = {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

type NewsState = {
  listOfNews: NewsItem[];
};

const initialState: NewsState = {
  listOfNews: [],
};

export const getNews = createAsyncThunk<NewsItem[]>("news/getNews", async () => {
  const response = await fetch(URL);
  const listOfIds = await response.json();

  const promises = listOfIds
    .slice(0, 10)
    .map((id: number) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
    );

  const news = await Promise.all(promises);
  const resolvedNews = await Promise.all(
    news.map(async (item) => await item.json())
  );

  return resolvedNews;
});

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.listOfNews = action.payload;
    });
  },
});

export const selectNews = (state: RootState) => state.news.listOfNews;

export const newsReducer = news.reducer;
