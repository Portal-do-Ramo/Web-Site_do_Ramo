export default function updateState(images,setImages, newImage) {
    const newArray = [...images, newImage];
    setImages(newArray);
}