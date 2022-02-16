import React, { useEffect, useRef, useState } from "react";
import Comment from "./components/Comment";
import { fetchComments } from "./helpers/api";
import { CommentModel } from "./models";

const App: React.FC = () => {
  const insideDivRef = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const pageNo = useRef(1);
  const [observer, _] = useState(
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            Number(entry.target.id) / 50 === pageNo.current // only load new entries when at bottom of page
          ) {
            console.log(entry.target.id, pageNo.current);
            fetchComments(pageNo.current + 1)
              .then(fetchedComments => {
                console.log(fetchedComments);
                setComments(prev => [...prev, ...fetchedComments]);
              })
              .then(() => pageNo.current++);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    )
  );

  useEffect(() => {
    fetchComments(1).then(fetchedComments => setComments(fetchedComments));
  }, []);

  console.log(comments, pageNo);

  return (
    <div id="inside" ref={insideDivRef}>
      <div>Hello World</div>
      <ol>
        {comments.map(comment => (
          <Comment observer={observer} comment={comment} key={comment.id} />
        ))}
      </ol>
    </div>
  );
};

export default App;
