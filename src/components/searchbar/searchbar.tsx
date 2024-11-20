import React from "react";
import "./searchbar.css";

export default function Searchbar({
  options,
  onSearch,
}: {
  options: string[];
  onSearch: Function;
}) {
  const [key, setKey] = React.useState(options[0]);
  const [search, setSearch] = React.useState("");
  return (
    <div className="searchbar">
      <select
        onChange={(e) => {
          setKey(e.target.value);
        }}
      >
        {options.map((text, idx) => (
          <option key={idx} value={text}>
            {text}
          </option>
        ))}
      </select>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <button
        type="button"
        onClick={() => {
          const params: any = {};
          if (key) {
            params[key] = search;
            onSearch(params);
          }
        }}
      >
        search
      </button>
    </div>
  );
}
