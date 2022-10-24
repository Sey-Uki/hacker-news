import { useEffect, useState } from "react";
import {
  getNews,
  getNewsIds,
  selectNews,
  selectNewsIds,
} from "../../store/slices/news";
import { useAppDispatch, useAppSelector } from "../../store";
import { useHistory } from "react-router-dom";
import { MainHeader } from "../../components/MainHeader/MainHeader";
import { NewsPagination } from "../../components/NewsPagination/NewsPagination";
import { NewsList } from "../../components/NewsList/NewsList";
import { Skeletons } from "../../components/Skeletons/Skeletons";
import { Endpoints } from "../../shared/constants";

const NEWS_PER_PAGE = 5;
const INTERVAL = 60000;

export const Main = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(
    Number(localStorage.getItem("pageNumber")) || 1
  );

  const news = useAppSelector(selectNews);
  const newsIds = useAppSelector(selectNewsIds);

  // Fetching news IDs for the first time
  useEffect(() => {
    if (newsIds.length) return;

    dispatch(getNewsIds());
  }, [dispatch, newsIds.length]);

  // Fetching news based on the IDs
  useEffect(() => {
    if (!newsIds.length) return;

    setIsLoading(true);

    dispatch(getNews({ newsIds, pageNumber })).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch, newsIds, pageNumber]);

  // Fetching news IDs every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFetching(true);
      dispatch(getNewsIds());
    }, INTERVAL);

    return () => {
      setIsFetching(false);
      clearInterval(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    history.replace(`${Endpoints.News}/?page=${pageNumber}`);
  }, [history, pageNumber]);

  return (
    <div className="main">
      <MainHeader isLoading={isLoading} isFetching={isFetching} />

      {(isLoading && !isFetching) || !news.length ? (
        <Skeletons amount={NEWS_PER_PAGE} />
      ) : (
        <NewsList news={news} />
      )}

      <NewsPagination
        setPageNumber={setPageNumber}
        total={newsIds.length}
        pageNumber={pageNumber}
      />
    </div>
  );
};
