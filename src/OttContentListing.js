import React, { useState } from "react";
import { Skeleton } from "antd";
import { Pagetitle } from "./Pagetitle";
import useSWR from "swr";
import { fetcher } from "./fetch";
import { PosterCard } from "./PosterCard";

const OttContentListing = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    `https://test.create.diagnal.com/data/page${page}.json`,
    fetcher
  );

  const handleIconClick = () => {
    setIsInputVisible(true);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleInputBlur = () => {
    setIsInputVisible(false);
  };

  if (isLoading) {
    <Skeleton active />;
  }

  const loadMore = () => {
    if (!data) return;
    setPage((prevCount) => prevCount + 1);
    setQuery("");
    mutate();
  };

  const filteredData = !isLoading
    ? data?.page["content-items"].content?.filter((item) => {
        return ["name"].some((key) => {
          return item[key]
            ?.toString()
            .toLowerCase()
            .includes(query?.toString().toLowerCase());
        });
      })
    : data;

  return (
    <>
      <img
        src="https://test.create.diagnal.com/images/nav_bar.png"
        alt="nav"
        className="flex justify-between fixed top-0 w-100 h-100"
        style={{ width: "100%" }}
      />
      <div className="flex justify-between sticky top-2">
        <div className="flex justify-items-center gap-2">
          {page === 1 ? (
            <></>
          ) : (
            <img
              src="https://test.create.diagnal.com/images/Back.png"
              alt="back"
              style={{ cursor: "pointer" }}
              className="ml-2"
              onClick={() => {
                setPage((prevCount) => prevCount - 1);
                setQuery("");
              }}
            />
          )}
          <Pagetitle title={data?.page ? data?.page.title : "Loading"} />
        </div>

        <div className="flex justify-end ">
          <div
            className={`icon-container ${isInputVisible ? "hide-icon" : ""}`}
            onClick={handleIconClick}
          >
            <img
              src="https://test.create.diagnal.com/images/search.png"
              alt="search"
              style={{ cursor: "pointer" }}
              className="mr-3"
            />
          </div>
          <input
            className={`mr-3 search-input ${
              isInputVisible ? "show-input" : "hide-input"
            }`}
            style={{
              backgroundColor: "black",
              border: "black",
            }}
            autoFocus={true}
            placeholder="Search"
            value={query}
            maxLength={20}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 bg-primary  pt-6">
        {!isLoading ? (
          filteredData.map((item, index) => (
            <>
              <PosterCard
                key={index}
                name={item.name}
                posterImage={item["poster-image"]}
              />
            </>
          ))
        ) : (
          <Skeleton active />
        )}

        <button onClick={loadMore}>{page < 3 ? " Load More " : ""}</button>
      </div>
    </>
  );
};

export default OttContentListing;
