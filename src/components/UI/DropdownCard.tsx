import { useState, ReactNode } from "react";

type TDropdownCard = {
  header: ReactNode,
  body: ReactNode
}
const DropdownCard: React.FC<TDropdownCard> = ({header, body}) => {
  const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="bg-dark-2 rounded">
			{/* Header */}
			<div
				className="bg-dark-3 rounded p-6 cursor-pointer bounceTransition hover:scale-105"
				onClick={(_e) => setIsOpen(!isOpen)}
			>
				{header}
			</div>

			{/* Body */}
			{isOpen && (
				<div className="p-6">
					{body}
				</div>
			)}
		</div>
	);
}

export default DropdownCard