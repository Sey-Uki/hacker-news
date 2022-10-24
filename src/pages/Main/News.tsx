import { Button, Typography, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Comments } from "../../components/Comments";
import { getPublishDate } from "../../helpers/getPublishDate";
import { useAppDispatch, useAppSelector } from "../../store";
import { getComments } from "../../store/slices/comments";
import { getSingleNews, selectSingleNews } from "../../store/slices/news";

const { Title, Text } = Typography;

export const News = () => {
  const { newsId }: { newsId: string } = useParams();
  const singleNews = useAppSelector(selectSingleNews);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = () => {
    if (singleNews?.kids) {
      setIsLoading(true);
      dispatch(getComments(singleNews?.kids)).finally(() =>
        setIsLoading(false)
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);

    dispatch(getSingleNews(newsId)).finally(() => setIsLoading(false));
  }, [dispatch, newsId]);

  if (!singleNews) return null;

  return (
    <div className="news">
      <Link to="/">Назад</Link>
      <Title>{singleNews.title}</Title>
      <Typography.Link href={singleNews.url} target="_blank">
        {singleNews.url}
      </Typography.Link>
      <Text type="secondary">
        Дата публикации: {getPublishDate(singleNews.time)} Автор:{" "}
        {singleNews.by}
      </Text>
      <Text>Все комментарии: {singleNews.descendants}</Text>{" "}
      {singleNews.kids && (
        <Button loading={isLoading} onClick={fetchComments}>
          Обновить комментарии
        </Button>
      )}
      {isLoading ? (
        <Spin tip="Loading..." />
      ) : (
        singleNews.kids && (
          <Comments isLoading={isLoading} kids={singleNews.kids} />
        )
      )}
    </div>
  );
};
