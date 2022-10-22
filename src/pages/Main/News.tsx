import { Typography } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getSingleNews, selectSingleNews } from "../../store/slices/news";

const { Title, Link, Text } = Typography;

export const News = () => {
  const { newsId }: { newsId: string } = useParams();
  const singleNews = useAppSelector(selectSingleNews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleNews(newsId));
  }, [dispatch, newsId]);

  const getPublishDate = (time: number) => {
    const dateTimeStr = new Date(time * 1000).toLocaleString();
    const result = dateTimeStr;
    return result;
  };

  if (!singleNews) return null;

  return (
    <div className="news">
      <Title>{singleNews.title}</Title>
      <Link href={singleNews.url} target="_blank">
        {singleNews.url}
      </Link>
      <Text type="secondary">
        Дата публикации: {getPublishDate(singleNews.time)} Автор:{" "}
        {singleNews.by}
      </Text>
      <div>
        <Text>Все комментарии: {singleNews.descendants}</Text>
        {/* дерево комментариев  */}
      </div>
    </div>
  );
};
