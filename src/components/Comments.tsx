import { useEffect, useState } from "react";
import { SingleComment } from "./SingleComment";
import { useAppDispatch } from "../store";
import { CommentItem } from "../store/slices/comments";

export const Comments = ({ kids }: any) => {
  const dispatch = useAppDispatch();

  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      const promises = kids.map((id: number) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
      );

      const comments = await Promise.all(promises);
      const resolvedComments = await Promise.all(
        comments.map(async (item) => await item.json())
      );

      setComments(resolvedComments);
    };

    getData();
  }, [dispatch, kids]);
  return (
    <div className="comments">
      {comments.map((comment) => {
        return <SingleComment comment={comment} key={comment.id} />;
      })}
    </div>
  );
};
