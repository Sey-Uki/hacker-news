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
  singleNews: NewsItem | null;
};

const initialState: NewsState = {
  listOfNews: [],
  singleNews: null,
};

export const getNews = createAsyncThunk<NewsItem[]>(
  "news/getNews",
  async () => {
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
  }
);

export const getSingleNews = createAsyncThunk<NewsItem, string>(
  "news/getSingleNews",
  async (id) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );

    return await response.json()
  }
);

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.listOfNews = action.payload;
    });
    builder.addCase(getSingleNews.fulfilled, (state, action) => {
      state.singleNews = action.payload;
    });
  },
});

export const selectNews = (state: RootState) => state.news.listOfNews;
export const selectSingleNews = (state: RootState) => state.news.singleNews;

export const newsReducer = news.reducer;
