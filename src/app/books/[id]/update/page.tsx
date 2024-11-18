"use client";
import { AddBook, GetBookById, UpdateBook } from "@/api/graphql/book.api";
import Loader from "@/components/loader/loader";
import { useMutation, useQuery } from "@apollo/client";
import { redirect, useParams } from "next/navigation";
import React from "react";

export default function CreateBook() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GetBookById, {
    variables: {
      id,
    },
  });

  React.useEffect(() => {
    if (data) {
      setFormData(data.book);
    }
  }, [data]);

  const [updateBook] = useMutation(UpdateBook);

  const [formData, setFormData] = React.useState({
    author_id: "",
    title: "",
    published_date: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the specific field
    });
  };

  if (loading) return <Loader />;

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        updateBook({
          variables: {
            ...formData,
            id,
            published_date: new Date(Number(formData.published_date)),
          },
        });
        redirect("/books");
      }}
    >
      <div className="row">
        <div className="form-control">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Publish Date</label>
          <input
            name="published_date"
            value={
              new Date(Number(formData.published_date))
                .toISOString()
                .split("T")[0]
            }
            type="date"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div className="form-control">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-control">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
