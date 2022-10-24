import { Typography } from "antd";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Comments } from "../../components/Comments";
import { getPublishDate } from "../../helpers/getPublishDate";
import { useAppDispatch, useAppSelector } from "../../store";
import { getSingleNews, selectSingleNews } from "../../store/slices/news";

const { Title, Text } = Typography;

export const News = () => {
  const { newsId }: { newsId: string } = useParams();
  const singleNews = useAppSelector(selectSingleNews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleNews(newsId));
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
      <Text>Все комментарии: {singleNews.descendants}</Text>
      <Comments kids={singleNews.kids} />
    </div>
  );
};
