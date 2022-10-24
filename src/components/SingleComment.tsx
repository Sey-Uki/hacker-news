import { Button, Comment } from "antd";
import { useState } from "react";
import { Comments } from "./Comments";
import { getPublishDate } from "../helpers/getPublishDate";
import { CommentItem } from "../store/slices/comments";

export const SingleComment = ({ comment }: { comment: CommentItem }) => {
  const [withNested, setWithNested] = useState(false);

  return (
    <div className="comment" style={{ margin: "20px" }}>
      <Comment
        author={comment?.by}
        content={comment.deleted ? <div className="deleteComment">comment deleted</div> : comment?.text}
        datetime={<span>{getPublishDate(comment.time)}</span>}
      />
      <div>
        {comment.kids?.length ? (
          <Button onClick={() => setWithNested(true)}>+</Button>
        ) : null}
      </div>
      {withNested && comment.kids && <Comments kids={comment.kids} />}
    </div>
  );
};
