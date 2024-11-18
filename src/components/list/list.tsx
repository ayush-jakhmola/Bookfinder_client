import "./list.css";

export function ListContainer({ children }: { children: React.ReactNode }) {
  return <div className="list">{children}</div>;
}

export function ListItem({
  body,
  imgSrc,
  href,
}: {
  body: {
    heading?: string;
    subheading?: string;
    content?: string;
  };
  imgSrc: string;
  href: string;
}) {
  return (
    <a href={href}>
      <div className="list__item">
        <div className="list__item__cover">
          <img src={imgSrc} />
        </div>
        <div className="list__item__body">
          <div className="list__item__body__heading">{body.heading}</div>
          <div className="list__item__body__subheading">{body.subheading}</div>
          <div className="list__item__body__content">{body.content}</div>
        </div>
      </div>
    </a>
  );
}
