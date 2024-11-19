"use client";
import Loader from "@/components/loader/loader";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import "./page.css";
import { DeleteBook, GetBookById } from "@/api/graphql/book.api";
import { ListContainer } from "@/components/list/list";

export default function Page() {
  const { id } = useParams();
  const { loading, data } = useQuery(GetBookById, {
    variables: {
      id,
    },
  });

  const book = data?.book;

  const [deleteBook] = useMutation(DeleteBook);

  async function handleDelete() {
    await deleteBook({ variables: { id } });
    redirect("/books");
  }

  if (loading) return <Loader />;

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div className="image">
          <img src="https://picsum.photos/200/300/?blur" />
        </div>
        <div>
          <div className="header">
            <div className="heading">{`${book.title} (${
              new Date(Number(book.published_date))
                .toLocaleString()
                .split(",")[0]
            })`}</div>
            <div className="subheading">{book.author.name}</div>
          </div>
          <p>{book.description}</p>
        </div>
      </div>
      <div className="controls">
        <a onClick={handleDelete} className="btn red">
          Delete
        </a>
        <a href={`/books/${id}/update`} className="btn">
          Update
        </a>
        <a href={`/review/create?bookId=${id}`} className="btn">
          Review
        </a>
      </div>
      <div>
        <h1 style={{ fontSize: "25px", fontWeight: "bolder" }}>
          Reviews & Ratings
        </h1>
        <ListContainer>
          {book?.reviews &&
            book.reviews.map((_review: any, idx: number) => (
              <div key={idx} className="review">
                <div className="review__head">{_review.name}</div>
                <div className="review__body">{_review.review}</div>
                <div className="review__footer">
                  <div className="rating">
                    {Array(_review.rating).fill("*")}
                  </div>
                </div>
              </div>
            ))}
        </ListContainer>
      </div>
    </div>
  );
}
