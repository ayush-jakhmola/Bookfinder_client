"use client";
import {
  AddAuthor,
  GetAuthorById,
  UpdateAuthor,
} from "@/api/graphql/author.api";
import Loader from "@/components/loader/loader";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import React from "react";

export default function UpdateAuthorDetails() {
  const { id } = useParams();

  const [form, setForm] = React.useState({
    name: "",
    born_date: "",
    biography: "",
  });

  const { loading, error, data } = useQuery(GetAuthorById, {
    variables: {
      id,
    },
  });

  React.useEffect(() => {
    if (data) {
      setForm(data.author);
    }
  }, [data]);

  const [updateAuthor] = useMutation(UpdateAuthor);

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
        updateAuthor({
          variables: {
            id,
            ...form,
            born_date: new Date(Number(form.born_date)),
          },
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
            value={new Date(Number(form.born_date)).toISOString().split("T")[0]}
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
