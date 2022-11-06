import React from "react";

function Filter({ searchText, setSearchText }) {
  return (
    <div>
      Filter Shown with{" "}
      <input
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
    </div>
  );
}

export default Filter;
