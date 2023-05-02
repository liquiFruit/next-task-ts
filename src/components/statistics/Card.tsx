const Card: React.FC<{className?: string}> = (props) => {
  return (
    <>
      <div className={`flex flex-col items-center justify-center rounded bg-dark-2 ${props.className}`}>
        <p className="text-3xl font-bold">100</p>
        <p className="text-light-2">incomplete</p>
      </div>
    </>
  );
};

export default Card;
