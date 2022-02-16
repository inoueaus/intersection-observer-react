import { CommentModel } from "../models";

export const fetchComments: (
  pageNo: number
) => Promise<CommentModel[]> = async pageNo => {
  try {
    if (pageNo < 1) {
      throw Error("invalid page number");
    }

    const [result, _] = await Promise.all([
      fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${pageNo}&_limit=50`
      ),
      new Promise(resolve => setTimeout(() => resolve(true), 500)),
    ]);

    if (!result.ok) {
      throw Error("invalid response");
    }

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
