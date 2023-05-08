const Card: React.FC<{ className?: string, stat: string, title: string}> = ({className, stat, title}) => {
  return (
    <>
      <div
        className={`bg-dark-2 flex flex-col items-center justify-center rounded ${
          className ?? ""
        }`}
      >
        <p className="text-3xl font-bold">{stat}</p>
        <p className="text-light-2">{title}</p>
      </div>
    </>
  );
};

export default Card;
