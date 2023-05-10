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
        <div className="flex flex-row items-center gap-1">
          <p className="text-3xl font-bold">{stat}
          </p>
          {icon && <div className={`${icon} text-3xl`} />}
        </div>
        <p className="text-light-2">{title}</p>
      </div>
    </>
  );
};

export default Card;
