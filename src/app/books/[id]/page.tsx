"use client";
import Loader from "@/components/loader/loader";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import "./page.css";
import { DeleteBook, GetBookById } from "@/api/graphql/book.api";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GetBookById, {
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
      </div>
    </div>
  );
}
