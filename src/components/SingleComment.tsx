import { Comment } from "antd";
import { useState } from "react";
import { Comments } from "./Comments";
import { getPublishDate } from "../helpers/getPublishDate";

export const SingleComment = ({ comment }: any) => {
  const [withNested, setWithNested] = useState(false);

  return (
    <div className="comment" style={{margin: "20px"}}>
      <Comment
        author={comment?.by}
        content={comment?.text}
        datetime={<span>{getPublishDate(comment.time)}</span>}
      />
      <div>
        {comment.kids?.length ? (
          <button onClick={() => setWithNested(true)}>+</button>
        ) : null}
      </div>
      {withNested && <Comments kids={comment.kids} />}
    </div>
  );
};
