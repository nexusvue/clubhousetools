import React, { useRef, useEffect, useMemo } from 'react'
import Konva from 'konva'
import { Stage, Layer, Image, Text, Rect } from 'react-konva'

const WIDTH = 256
const HEIGHT = 256

interface Props {
	ref?: React.MutableRefObject<Konva.Stage>
	style: React.CSSProperties
	src: string
	text?: string
}

const Editor = React.forwardRef(({style, text, src}: Props, ref: React.ForwardedRef<Konva.Stage>) => {
	const stageRef = ref
	const imageRef = useRef<Konva.Image>(null)
	const textRef = useRef<Konva.Text>(null)
	const image = useRef<HTMLImageElement>(document.createElement('img'))

	useEffect(() => {
		image.current.src = src
		image.current.onload = () => {
			imageRef.current.getLayer().batchDraw()
		}
	}, [src])

	const centerTextX = useMemo(() => {
		return textRef.current ? WIDTH / 2 - (textRef.current.getWidth() / 2) : 0
	}, [textRef.current])

	return (
			<Stage
				ref={stageRef}
				style={style}
				width={WIDTH}
				height={HEIGHT}
			>
				<Layer>
					<Image
						ref={imageRef}
						image={image.current}
						x={0}
						y={0}
						width={WIDTH}
						height={HEIGHT}
					/>
					{text.length > 0 &&
						<>
							<Rect
								height={34}
								width={190}
								y={180}
								x={(WIDTH / 2) - 95}
								fill="#25AE60"
								shadowColor="black"
								shadowOffsetY={2}
								shadowOpacity={0.5}
								shadowBlur={5}
								cornerRadius={99}
							/>
							<Text
								ref={textRef}
								text={text}
								fontSize={24}
								width={190}
								fontFamily="Nunito"
								x={(WIDTH / 2) - 95}
								y={186}
								align="center"
								fill="white"
							/>
						</>
					}
				</Layer>
			</Stage>
	)
})

export default Editor
