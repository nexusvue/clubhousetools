import React, { useCallback, useState, useRef, useEffect } from 'react'
import Konva from 'konva'
import { Stage, Layer, Image, Text, Rect, Transformer } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'

const WIDTH = 256
const HEIGHT = 256

interface Props {
	ref?: React.MutableRefObject<Konva.Stage>
	style: React.CSSProperties
	src: string
	text?: string
}

const useTransformer = (ref: Konva.Shape) => {
	const transformer = useRef<Konva.Transformer>(new Konva.Transformer())

	useEffect(() => {
		if (ref) {
			transformer.current?.nodes([ref])
			transformer.current?.getLayer().batchDraw()
		}
	}, [ref])

	return transformer
}


const Editor = React.forwardRef(({style, text, src}: Props, ref: React.ForwardedRef<Konva.Stage>) => {
	const stageRef = ref
	const imageRef = useRef<Konva.Image>(null)
	const textRef = useRef<Konva.Text>(null)
	const [selectedRef, setSelectedRef] = useState(null)
	const image = useRef<HTMLImageElement>(document.createElement('img'))

	const transform = useTransformer(selectedRef)

	useEffect(() => {
		image.current.src = src
		image.current.onload = () => {
			imageRef.current.getLayer().batchDraw()
		}
	}, [src])

	const handleTransform = useCallback(
		(e: KonvaEventObject<MouseEvent>) => {
			/*
			if (e.target !== stageRef.current) {
				setSelectedRef(e.target)
			} else {
				setSelectedRef(null)
			}
			*/
		},
		[stageRef],
	)

	const centerTextX = textRef.current ? WIDTH / 2 - (textRef.current.getWidth() / 2) : 0

	return (
			<Stage
				ref={stageRef}
				style={style}
				width={WIDTH}
				height={HEIGHT}
				onClick={handleTransform}
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
								height={(textRef.current?.getHeight() ?? 0) + 16}
								width={(textRef.current?.getWidth() ?? 0) + 60}
								y={177}
								x={centerTextX - 30}
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
								fontFamily="Nunito"
								y={186}
								x={centerTextX}
								fill="white"
							/>
						</>
					}
					{selectedRef && <Transformer ref={transform} />}
				</Layer>
			</Stage>
	)
})

export default Editor
