"use client";
import { GetBooks } from "@/api/graphql/book.api";
import { ListContainer, ListItem } from "@/components/list/list";
import Loader from "@/components/loader/loader";
import Pagination from "@/components/pagination/pagination";
import Searchbar from "@/components/searchbar/searchbar";
import { useQuery } from "@apollo/client";
import React from "react";

export default function Book() {
  const [offset, setOffset] = React.useState(0);
  const { loading, data, refetch } = useQuery(GetBooks);
  const books = data?.books;

  console.log(data);

  if (loading) return <Loader />;

  // pagination
  const LIMIT = 5;
  const pageCount = Math.floor(books.count / LIMIT) + 1;

  function handlePageChange(page: number) {
    const offset = page * LIMIT;
    if (offset >= pageCount * LIMIT || offset < 0) {
      return;
    }
    setOffset(page);
    refetch({ limit: LIMIT, offset });
  }

  function handleSearch(params: any) {
    refetch(params);
  }

  return (
    <div className="container">
      <Searchbar options={["title", "author_name"]} onSearch={handleSearch} />
      <ListContainer>
        {books?.data &&
          books.data.map((_data: any, _idx: number) => (
            <ListItem
              key={_idx}
              href={`books/${_data.id}`}
              imgSrc="https://picsum.photos/200/300/?blur"
              body={{
                heading: _data.title,
                subheading: new Date(Number(_data.published_date))
                  .toLocaleString()
                  .split(",")[0],
                content: _data.author.name,
              }}
            />
          ))}
      </ListContainer>
      <Pagination
        offset={offset}
        pageCount={pageCount}
        onChange={handlePageChange}
      />
    </div>
  );
}
