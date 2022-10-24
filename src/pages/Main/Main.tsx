import { useEffect, useState } from "react";
import { getNews, NewsItem, selectNews } from "../../store/slices/news";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button, Skeleton, Spin } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { getPublishDate } from "../../helpers/getPublishDate";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const Main = () => {
  const news = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = () => {
    setIsLoading(true);
    dispatch(getNews()).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);

    dispatch(getNews()).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setInterval(() => dispatch(getNews()), 60000);
  }, [dispatch]);

  const skeletons = Array.from(new Array(5)).map((_, i) => {
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
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
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
        </>
      ) : (
        skeletons
      )}
    </div>
  );
};
