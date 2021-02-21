import React, {useCallback, useRef, useState, useEffect} from 'react'
import Cropper from 'react-easy-crop'
import Konva from 'konva'
import { saveAs } from 'file-saver'
import Editor from '../Editor'
import getCroppedImg from './cropUtils'
import Button from '../Button'
// @ts-ignore
import frame from './frame.svg'
// @ts-ignore
import clippath from './clippath.svg'

interface Props {
	className?: string
}

const style = {
	backgroundImage: `url(${frame})`,
}

const ImagePicker = ({className}: Props) => {
	const stageRef = useRef<Konva.Stage>(null)
	const inputFileRef = useRef<HTMLInputElement>(null)
	const [label, setLabel] = useState('')
	const [fileBase64, setFileBase64] = useState<string>()
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
	const [croppedImage, setCroppedImage] = useState(null)

	const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

	const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = getCroppedImg(
        fileBase64,
        croppedAreaPixels,
      )
      console.log('done', { croppedImage })
      setCroppedImage(croppedImage)
			setFileBase64(null)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

	const handleInputFileClick = useCallback(() => {
		if (inputFileRef.current) {
			inputFileRef.current.click()
		}

	}, [inputFileRef])

	const toBase64: (f: File) => Promise<string> = useCallback((file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				resolve(reader.result as string);
			}
			reader.onerror = error => reject(error);
		})
	, [])

	const handleFileChange = useCallback(() => {
		const file = inputFileRef.current?.files?.[0]
		if (!file) return

		setFileBase64(null)

		toBase64(file).then((fileBase64) => {
			setFileBase64(() => fileBase64)
		})
	}, [inputFileRef.current])

	const handleExport = useCallback(
		async () => {
			const img: HTMLImageElement = await (new Promise((resolve) => {
				stageRef.current.toImage({
					mimeType: 'image/png',
					pixelRatio: 2,
					callback: file => resolve(file)
				})
			}))


			saveAs(img.src, 'clubhouse-profile.png')
		},
		[stageRef.current],
	)

	return (
		<div className={className}>
			<div
				className="cursor-pointer w-64 h-64 flex justify-center items-center bg-auto bg-no-repeat bg-center bg-contain"
				style={style}
				onClick={handleInputFileClick}
			>
				{
					croppedImage
					? <Editor
							ref={stageRef}
							src={croppedImage}
							text={label}
							style={{
								WebkitMaskImage: `url(${clippath})`,
								maskImage: `url(${clippath})`,
								WebkitMaskSize: `cover`,
								maskSize: `cover`,
							}}
						/>
					: <div className="w-36 text-center text-xl text-gray-800">Click to upload a picture</div>
				}
			</div>
			{fileBase64 &&
			<div className="absolute top-0 right-0 bottom-0 left-0">
				<Cropper
					image={fileBase64}
					aspect={1}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropComplete}
					crop={crop}
					zoom={zoom}
				/>
				<div className="absolute left-0 bottom-0 right-0 p-4 pb-8 flex justify-center">
					<Button icon="✂️" label="Crop!" onClick={showCroppedImage}/>
				</div>
			</div>
			}
			<input className="hidden" type="file" ref={inputFileRef} onChange={handleFileChange}/>
			<div className="mt-8 flex flex-col items-center justify-center">
				{croppedImage &&
					<>
						<select className="mb-8" onChange={(e) => setLabel(e.target.value)}>
							<option value=""></option>
							<option value="👂 Listening">Listening</option>
							<option value="🗣 Speaker">Speaker</option>
							<option value="‍⚖️ Moderating">Moderating</option>
							<option value="📹 Recording">Recording</option>
						</select>
						<Button icon="🎉" label="Let's go" onClick={handleExport}/>
					</>
				}
			</div>
		</div>
	)
}

export default ImagePicker
