"use client";
import { GetAuthors } from "@/api/graphql/author.api";
import { ListContainer, ListItem } from "@/components/list/list";
import Loader from "@/components/loader/loader";
import Pagination from "@/components/pagination/pagination";
import Searchbar from "@/components/searchbar/searchbar";
import { useQuery } from "@apollo/client";
import React from "react";

export default function Author() {
  const [offset, setOffset] = React.useState(0);
  const { loading, data, refetch } = useQuery(GetAuthors);
  const authors = data?.authors;

  if (loading) return <Loader />;

  // pagination
  const LIMIT = 5;
  const pageCount = Math.floor(authors.count / LIMIT) + 1;

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
      <div className="row">
        <Searchbar options={["name", "born_year"]} onSearch={handleSearch} />
        <a href="authors/create" className="btn">
          Create Author
        </a>
      </div>
      <ListContainer>
        {authors?.data &&
          authors?.data.map((_data: any, _idx: number) => (
            <ListItem
              key={_idx}
              href={`authors/${_data.id}`}
              imgSrc="https://picsum.photos/200/300/?blur"
              body={{
                heading: _data.name,
                subheading: new Date(Number(_data.born_date))
                  .toLocaleString()
                  .split(",")[0],
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
