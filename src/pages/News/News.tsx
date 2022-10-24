import { Divider, Empty, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";
import { NewsHeader } from "../../components/NewsHeader/NewsHeader";
import { Skeletons } from "../../components/Skeletons/Skeletons";
import { useAppDispatch } from "../../store";
import { getComments } from "../../store/slices/comments";
import { getSingleNews, NewsItem } from "../../store/slices/news";

const { Text } = Typography;

export const News = () => {
  const dispatch = useAppDispatch();
  const { newsId }: { newsId: string } = useParams();

  const [singleNews, setSingleNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = () => {
    if (singleNews?.kids?.length) {
      setIsLoading(true);
      dispatch(getComments(singleNews?.kids)).finally(() => {
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    dispatch(getSingleNews(newsId))
      .unwrap()
      .then((payload: NewsItem) => {
        setSingleNews(payload);
      });
  }, [dispatch, newsId]);

  if (!singleNews) return null;

  const kids = singleNews.kids;

  return (
    <div className="news">
      <NewsHeader
        singleNews={singleNews}
        isLoading={isLoading}
        fetchComments={fetchComments}
      />

      <Divider />

      <Text>
        <strong>Comments total:</strong> {singleNews.descendants}
      </Text>

      {!singleNews.descendants && (
        <Empty description="No comments found!" />
      )}

      {!isLoading && kids?.length ? (
        <Comments kids={kids} />
      ) : (
        <Skeletons amount={kids?.length || 0} />
      )}
    </div>
  );
};
