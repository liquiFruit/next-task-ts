type ICardProps = {
  className?: string,
  stat: string,
  title: string,
  icon?: string
}
const Card: React.FC<ICardProps> = ({ className, stat, title, icon }) => {
  return (
    <>
      <div
        className={`bg-dark-2 flex flex-col items-center justify-center rounded ${className ?? ""
          }`}
      >
        <div className="flex flex-row items-center gap-1 text-3xl">
          <p className="font-bold">{stat}
          </p>
          {icon && <div className={`${icon}`} />}
        </div>
        <p className="text-light-2">{title}</p>
      </div>
    </>
  );
};

export default Card;
