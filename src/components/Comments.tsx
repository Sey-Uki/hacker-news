import { useEffect, useState } from "react";
import { SingleComment } from "./SingleComment";
import { useAppDispatch } from "../store";
import { CommentItem, getComments } from "../store/slices/comments";

type Props = {
  kids: number[];
  isLoading?: boolean;
}

export const Comments = ({ kids, isLoading }: Props) => {
  const dispatch = useAppDispatch();

  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    dispatch(getComments(kids))
      .unwrap()
      .then((payload: CommentItem[]) => {
        setComments(payload);
      });
  }, [dispatch, kids]);

  return (
    <div style={{ opacity: isLoading ? 0.5 : 1 }} className="comments">
      {comments.map((comment) => {
        return <SingleComment comment={comment} key={comment.id} />;
      })}
    </div>
  );
};
