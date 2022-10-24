import { Divider, Typography } from "antd";
import { useAppDispatch } from "../../store";
import { getNewsIds } from "../../store/slices/news";
import { RefetchButton } from "../RefetchButton/RefetchButton";
import s from "./MainHeader.module.css";

const { Title } = Typography;

type Props = {
  isLoading: boolean;
  isFetching: boolean;
};

export const MainHeader = ({ isLoading, isFetching }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <header className={s.header}>
        <Title>Hacker News</Title>
        <RefetchButton
          isLoading={isLoading && !isFetching}
          refetch={() => dispatch(getNewsIds())}
          title="Refetch news"
        />
      </header>
      <Divider />
    </>
  );
};
