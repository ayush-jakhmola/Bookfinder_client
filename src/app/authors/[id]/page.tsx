"use client";
import { DeleteAuthor, GetAuthorById } from "@/api/graphql/author.api";
import Loader from "@/components/loader/loader";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import "./page.css";

export default function Page() {
  const { id } = useParams();
  const { loading, data } = useQuery(GetAuthorById, {
    variables: {
      id,
    },
  });

  const author = data?.author;

  const [deleteAuthor] = useMutation(DeleteAuthor);

  async function handleDelete() {
    await deleteAuthor({ variables: { id } });
    redirect("/authors");
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
            <div className="heading">{author.name}</div>
            <div className="subheading">
              {
                new Date(Number(author.born_date))
                  .toLocaleString()
                  .split(",")[0]
              }
            </div>
          </div>
          <p>{author.biography}</p>
        </div>
      </div>
      <div className="controls">
        <a onClick={handleDelete} className="btn red">
          Delete
        </a>
        <a href={`/authors/${id}/update`} className="btn">
          Update
        </a>
        <a href={`/books/create?authorId=${id}`} className="btn">
          Add Books
        </a>
      </div>
    </div>
  );
}
