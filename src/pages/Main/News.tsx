import { Typography, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { Comment } from "antd";
import {
  getComment,
  getSingleNews,
  selectComments,
  selectSingleNews,
} from "../../store/slices/news";

const { Title, Text } = Typography;

export const News = () => {
  const { newsId }: { newsId: string } = useParams();
  const singleNews = useAppSelector(selectSingleNews);
  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleNews(newsId));
    if (!singleNews?.kids) return;
    dispatch(getComment(singleNews?.kids));
  }, [dispatch, newsId, singleNews]);

  const getPublishDate = (time: number) => {
    const dateTimeStr = new Date(time * 1000).toLocaleString();
    const result = dateTimeStr;
    return result;
  };

  if (!singleNews) return null;

  console.log(singleNews);

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
      <div>
        <Text>Все комментарии: {singleNews.descendants}</Text>
        {comments.map((comment) => {
          return (
            <Comment
              author={comment?.by}
              content={comment?.text}
              datetime={<span>{getPublishDate(singleNews.time)}</span>}
            />
          );
        })}

        {/* дерево комментариев  */}
      </div>
    </div>
  );
};
