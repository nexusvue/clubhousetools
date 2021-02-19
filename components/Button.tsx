import React from 'react'

interface Props {
	className?: string
	icon?: string
	label: string
	onClick?: () => void
}

const Button: React.FC<Props> = ({className, icon, label, onClick = () => {}}) =>
	<div className={`bg-primary inline-block text-white py-1 px-5 cursor-pointer rounded-full ${className ?? ''}`} onClick={onClick}>
		{icon && <span className="pr-2">{icon}</span>}{label}
	</div>

export default Button
