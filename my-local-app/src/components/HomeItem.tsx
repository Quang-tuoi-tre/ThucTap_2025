interface HomeItemProp{
  title:string
  description:string
}

export function HomeItem({ title, description }:HomeItemProp) {
  return (
    <div className="contact-item">
      <h1>{title}</h1>
      <p>Email: {description}</p>
    </div>
  );
}