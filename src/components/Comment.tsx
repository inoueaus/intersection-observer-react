import React, { useEffect, useRef } from "react";
import { CommentModel } from "../models";

const Comment: React.FC<{
  comment: CommentModel;
  observer: IntersectionObserver;
}> = props => {
  const commentRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (commentRef.current) {
      props.observer.observe(commentRef.current);
    }
  }, [commentRef]);
  return (
    <li ref={commentRef} id={String(props.comment.id)}>
      <h3>
        <strong>{props.comment.name}</strong>
      </h3>
      <p>{props.comment.body}</p>
    </li>
  );
};

export default Comment;
