import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

export const NoMatch = () => {
  const history = useHistory();

  const goBack = () => {
    history.push("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={goBack}>Back Home</Button>}
    />
  );
};
