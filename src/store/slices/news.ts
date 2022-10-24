import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const URL =
  "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";

export type NewsItem = {
  by?: string;
  descendants?: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title?: string;
  type: string;
  url: string;
};

type NewsState = {
  newsIds: number[];
  listOfNews: NewsItem[];
};

const initialState: NewsState = {
  newsIds: [],
  listOfNews: [],
};

export const getNewsIds = createAsyncThunk<number[]>(
  "news/getNewsIds",
  async () => {
    const response = await fetch(URL);
    const result = await response.json() as number[];
    return result.slice(1, 101);
  }
);

export const getNews = createAsyncThunk<NewsItem[], { newsIds: number[], pageNumber: number }>(
  "news/getNews",
  async ({ newsIds, pageNumber }) => {

    const from = pageNumber * 5 - 5;
    const to = pageNumber * 5;

    const promises = newsIds
      .slice(from, to)
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

    return await response.json();
  }
);

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsIds.fulfilled, (state, action) => {
      state.newsIds = action.payload;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.listOfNews = action.payload;
    });
  },
});

export const selectNews = (state: RootState) => state.news.listOfNews;
export const selectNewsIds = (state: RootState) => state.news.newsIds;

export const newsReducer = news.reducer;
