import { Divider, Pagination } from "antd";

type Props = {
  total: number;
  pageNumber: number;
  setPageNumber: (value: number) => void;
};

export const NewsPagination = ({ setPageNumber, total, pageNumber }: Props) => {
  return (
    <>
      <Divider />
      <Pagination
        onChange={(page) => {
          setPageNumber(page);
          localStorage.setItem("pageNumber", String(page));
        }}
        total={total}
        current={pageNumber}
        pageSizeOptions={[]}
        defaultPageSize={5}
      />
    </>
  );
};
