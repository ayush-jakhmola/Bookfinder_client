"use client";

import { CreateReview } from "@/api/graphql/review.api";
import Loader from "@/components/loader/loader";
import { useMutation } from "@apollo/client";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <CreateReviewPage />
    </Suspense>
  );
}

function CreateReviewPage() {
  const searchParams = useSearchParams();
  const book_id = searchParams.get("bookId");

  const [formData, setFormData] = React.useState({
    name: "",
    rating: "",
    review: "",
  });

  const [addReview, { loading }] = useMutation(CreateReview);

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
        addReview({
          variables: {
            book_id,
            ...formData,
            rating: parseInt(formData.rating),
          },
        });
        redirect(`/books/${book_id}`);
      }}
    >
      <div className="row">
        <div className="form-control">
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Rating</label>
          <select name="rating" onChange={handleChange}>
            <option disabled>--Select--</option>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div>
        <div className="form-control">
          <label>Review</label>
          <textarea
            name="review"
            value={formData.review}
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
