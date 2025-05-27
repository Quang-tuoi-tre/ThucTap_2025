interface NewsItemProp{
  title:string
  description:string
}

export function NewsItem({ title, description }:NewsItemProp) {
  return (
    <div className="news-item">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}