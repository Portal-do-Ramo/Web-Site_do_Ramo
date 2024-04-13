import { createContext, useState } from 'react';

export const ImageContext = createContext({});

export function ImageContextProvider({ children }) {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  function updateState(images, setImages, newImage) {
    const newArray = [...images, newImage];
    setImages(newArray);
  }

  //Lida com a seleção de imagens em um evento de arquivo
  function handleSelectImages(event) {
    if (!event.target.files) return;
    const selectedImage = event.target.files[0];

    const selectedImagePreview = URL.createObjectURL(selectedImage);

    updateState(images, setImages, selectedImage);
    updateState(previewImages, setPreviewImages, selectedImagePreview);
  }

  return (
    <ImageContext.Provider
      value={{
        handleSelectImages,
        images,
        previewImages,
        setPreviewImages,
        setImages
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
