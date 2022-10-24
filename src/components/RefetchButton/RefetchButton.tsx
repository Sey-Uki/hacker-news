import { SyncOutlined } from "@ant-design/icons";
import { Button } from "antd";

type Props = {
  isLoading: boolean;
  refetch: () => void;
  title: string;
};

export const RefetchButton = ({ isLoading, refetch, title }: Props) => {
  return (
    <Button
      type="primary"
      loading={isLoading}
      onClick={refetch}
      icon={<SyncOutlined />}
    >
      {title}
    </Button>
  );
};
