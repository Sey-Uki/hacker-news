import { useEffect, useState, useCallback } from "react";
import {
  getNews,
  getNewsIds,
  NewsItem,
  selectNews,
  selectNewsIds,
} from "../../store/slices/news";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button, Pagination, Skeleton, Spin } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getPublishDate } from "../../helpers/getPublishDate";

const NEWS_PER_PAGE = 5;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const Main = () => {
  const news = useAppSelector(selectNews);
  const newsIds = useAppSelector(selectNewsIds);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(
    Number(localStorage.getItem("pageNumber")) || 1
  );

  useEffect(() => {
    if (newsIds.length) return;

    dispatch(getNewsIds());
  }, [dispatch, newsIds.length]);

  const fetchNews = useCallback(() => {
    setIsLoading(true);

    dispatch(getNewsIds()).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!newsIds.length) return;

    setIsLoading(true);
    dispatch(getNews({ newsIds, pageNumber })).finally(() =>
      setIsLoading(false)
    );
  }, [dispatch, fetchNews, newsIds, pageNumber]);

  useEffect(() => {
    if (!newsIds.length) return;

    history.push(`/?page=${pageNumber}`);

    setInterval(() => dispatch(getNews({ newsIds, pageNumber })), 60000);
  }, [dispatch, history, newsIds, pageNumber]);

  const skeletons = Array.from(new Array(NEWS_PER_PAGE)).map((_, i) => {
    return (
      <div key={i} className="skeleton">
        <Skeleton active />
      </div>
    );
  });

  return (
    <div className="main">
      {news.length ? (
        <>
          <Button loading={isLoading} onClick={fetchNews}>
            Обновить новости
          </Button>
          {isLoading ? (
            <Spin tip="Loading..." />
          ) : (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={news}
              renderItem={(item: NewsItem) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText
                      icon={LikeOutlined}
                      text={String(item.score)}
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text={String(item.descendants)}
                      key="list-vertical-message"
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={<Link to={`/${item.id}`}>{item.title}</Link>}
                    description={`Автор: ${item.by}`}
                  />
                  {getPublishDate(item.time)}
                </List.Item>
              )}
            />
          )}

          <Pagination
            onChange={(page) => {
              setPageNumber(page);
              localStorage.setItem("pageNumber", String(page));
            }}
            total={newsIds.length}
            current={pageNumber}
            pageSizeOptions={[]}
            defaultPageSize={5}
          />
        </>
      ) : (
        skeletons
      )}
    </div>
  );
};
