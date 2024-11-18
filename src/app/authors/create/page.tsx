"use client";
import { AddAuthor } from "@/api/graphql/author.api";
import Loader from "@/components/loader/loader";
import { useMutation } from "@apollo/client";
import { redirect } from "next/navigation";
import React from "react";

export default function CreateAuthor() {
  const [form, setForm] = React.useState({
    name: "",
    born_date: "",
    biography: "",
  });
  const [addAuthor, { loading }] = useMutation(AddAuthor);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
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
          variables: form,
        });
        redirect("/authors");
      }}
    >
      <div className="row">
        <div className="form-control">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Born Date</label>
          <input
            name="born_date"
            value={form.born_date}
            type="date"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div className="form-control">
          <label>Biography</label>
          <textarea
            name="biography"
            value={form.biography}
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
