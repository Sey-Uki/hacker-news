import { useEffect, useState } from "react";
import { SingleComment } from "../SingleComment/SingleComment";
import { useAppDispatch } from "../../store";
import { CommentItem, getComments } from "../../store/slices/comments";
import { Skeletons } from "../Skeletons/Skeletons";

type Props = {
  kids: number[];
};

export const Comments = ({ kids }: Props) => {
  const dispatch = useAppDispatch();

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    dispatch(getComments(kids))
      .unwrap()
      .then((payload: CommentItem[]) => {
        setComments(payload);
        setIsLoading(false);
      });
  }, [dispatch, kids]);

  if (isLoading) return <Skeletons amount={kids.length} />;

  return (
    <div style={{ opacity: isLoading ? 0.5 : 1 }} className="comments">
      {comments.map((comment) => {
        return (
          <SingleComment comment={comment} key={comment.id} />
        );
      })}
    </div>
  );
};
