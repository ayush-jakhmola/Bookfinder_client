import "./pagination.css";
export default function Pagination({
  offset,
  pageCount,
  onChange,
}: {
  offset: number;
  pageCount: number;
  onChange: Function;
}) {
  return (
    <div className="pag">
      <a
        className="pag_prev selected"
        onClick={() => {
          onChange(offset - 1);
        }}
      >
        Prev
      </a>
      {Array(pageCount)
        .fill(null)
        .map((_, idx) => (
          <a
            key={idx}
            onClick={() => {
              onChange(idx);
            }}
            className={idx === offset ? "selected" : ""}
          >
            {idx + 1}
          </a>
        ))}
      <a
        className="pag_next selected"
        onClick={() => {
          onChange(offset + 1);
        }}
      >
        Next
      </a>
    </div>
  );
}
