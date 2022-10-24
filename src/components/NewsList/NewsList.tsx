import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import { Link } from "react-router-dom";
import { getPublishDate } from "../../helpers/getPublishDate";
import { Endpoints } from "../../shared/constants";
import { NewsItem } from "../../store/slices/news";

const IconText = ({ icon, text }: { icon: JSX.Element; text: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

type Props = {
  news: NewsItem[];
};

export const NewsList = ({ news }: Props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={news}
      renderItem={(item: NewsItem) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={
                <LikeOutlined style={{ color: item.score ? "#ff9800" : "" }} />
              }
              text={String(item.score)}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={
                <MessageOutlined
                  style={{ color: item.descendants ? "#2684ff" : "" }}
                />
              }
              text={String(item.descendants)}
              key="list-vertical-message"
            />,
          ]}
        >
          <List.Item.Meta
            title={<Link to={`${Endpoints.News}/${item.id}`}>{item.title}</Link>}
            description={`Author: ${item.by}`}
          />
          {getPublishDate(item.time)}
        </List.Item>
      )}
    />
  );
};
