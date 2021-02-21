interface Crop {
	x: number
	y: number
	width: number
	height: number
}

export default function getCroppedImg(imageBase64: string, pixelCrop: Crop, resizeTo = 512) {
  const image = new Image()
	image.src = imageBase64;
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = resizeTo
  canvas.height = resizeTo

  ctx.drawImage(
    image,
		pixelCrop.x,
		pixelCrop.y,
    pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		resizeTo,
		resizeTo
  )

  // As Base64 string
  return canvas.toDataURL();
}
