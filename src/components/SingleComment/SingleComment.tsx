import { Button, Comment, Divider } from "antd";
import { useState } from "react";
import { Comments } from "../Comments/Comments";
import { getPublishDate } from "../../helpers/getPublishDate";
import { CommentItem } from "../../store/slices/comments";

type Props = {
  comment: CommentItem;
};

export const SingleComment = ({ comment }: Props) => {
  const [withNested, setWithNested] = useState(false);

  const toggle = () => {
    setWithNested((w) => !w);
  };

  return (
    <div className="comment" style={{ marginLeft: "37px" }}>
      <Comment
        author={comment?.by}
        content={
          comment.deleted ? (
            <div className="deleteComment">comment deleted</div>
          ) : (
            comment?.text
          )
        }
        datetime={<span>{getPublishDate(comment.time)}</span>}
      />
      <div>
        {comment.kids?.length ? (
          <Button
            size="small"
            danger={withNested}
            type={withNested ? "ghost" : "primary"}
            onClick={toggle}
          >
            {withNested ? "-" : "+"}
          </Button>
        ) : null}
      </div>
      <Divider dashed />
      {withNested && comment.kids && <Comments kids={comment.kids} />}
    </div>
  );
};
