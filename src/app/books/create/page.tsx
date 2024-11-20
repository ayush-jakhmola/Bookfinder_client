"use client";
import { AddBook } from "@/api/graphql/book.api";
import Loader from "@/components/loader/loader";
import { useMutation } from "@apollo/client";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <CreateBook />
    </Suspense>
  );
}

function CreateBook() {
  const searchParams = useSearchParams();
  const author_id = searchParams.get("authorId");

  const [formData, setFormData] = React.useState({
    title: "",
    published_date: "",
    description: "",
  });

  const [addAuthor, { loading }] = useMutation(AddBook);

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
        addAuthor({
          variables: {
            author_id,
            ...formData,
          },
        });
        redirect(`/authors/${author_id}`);
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
            value={formData.published_date}
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
