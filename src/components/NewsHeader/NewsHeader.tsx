import { ArrowLeftOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import { Link } from "react-router-dom";
import { getPublishDate } from "../../helpers/getPublishDate";
import { Endpoints } from "../../shared/constants";
import { NewsItem } from "../../store/slices/news";
import { RefetchButton } from "../RefetchButton/RefetchButton";

import s from "./NewsHeader.module.css";

const { Title, Text } = Typography;

type Props = {
  singleNews: NewsItem;
  isLoading: boolean;
  fetchComments: () => void;
};

export const NewsHeader = ({ singleNews, isLoading, fetchComments }: Props) => {
  return (
    <div className={s.newsHeader}>
      <section className={s.top}>
        <div>
          <Link to={Endpoints.Home}>
            <ArrowLeftOutlined />
          </Link>

          <Title>{singleNews.title}</Title>
        </div>
        {singleNews.kids && (
          <RefetchButton
            isLoading={isLoading}
            refetch={fetchComments}
            title="Refetch comments"
          />
        )}
      </section>
      <section className={s.bottom}>
        <Typography.Link href={singleNews.url} target="_blank">
          {singleNews.url}
        </Typography.Link>
        <Text type="secondary">
          <strong>Published:</strong> {getPublishDate(singleNews.time)}
        </Text>
        <Text type="secondary">
          <strong>Author:</strong> {singleNews.by}
        </Text>
      </section>
    </div>
  );
};
