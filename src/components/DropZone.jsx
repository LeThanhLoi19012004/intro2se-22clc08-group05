import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";
import "../assets/DropZone.css";
import { FaRegImage } from "react-icons/fa";
import { uploadPost } from "../API";

const MyPostWidget = ({ picturePath }) => {
  const [images, setImages] = useState([]);
  const [post, setPost] = useState("");
  const [clickImg, setclickImg] = useState(false);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length + images.length > 4) {
      alert("You can only upload a maximum of 4 images");
      return;
    }
    setImages([...images, ...acceptedFiles]);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('eventID', localStorage.getItem('eventid'));
    data.append('description', post);
    
    images.forEach((image) => {
      data.append('images', image);
    });

    console.log([...data]); // Kiểm tra dữ liệu trong FormData

    const response = await uploadPost(data);
    if (response.success) {
      setPost("");
      setImages([]);
      alert("Post created successfully!");
    }
  };

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png', '.jpg', '.svg', '.gif']
    },
    onDrop: handleDrop
  });

  const handleImgClick = () => {
    setclickImg(!clickImg);
  };

  return (
    <div className="dropzone__upload-widget">
      <div className="dropzone__header">
        <img src={picturePath} alt="Profile" className="dropzone__profile-img" />
        <textarea
          className="dropzone__description-input"
          placeholder="What's on your mind..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
          rows="1"
        />
        <FaRegImage size={28} color="green" onClick={handleImgClick} />
      </div>
      {clickImg && (
        <div className="dropzone__image-section">
          <div className="dropzone__image-container">
            {images.map((image, index) => (
              <div key={index} className="dropzone__image-item">
                <img src={URL.createObjectURL(image)} alt={`preview ${index}`} />
                <button onClick={() => handleRemoveImage(index)} className="dropzone__icon-button">
                  <FaTrash />
                </button>
              </div>
            ))}
            {images.length < 4 && (
              <div {...getRootProps()} className="dropzone__dropzone">
                <input {...getInputProps()} />
                {isDragReject ? <p>Only images are allowed</p> : <p>+</p>}
              </div>
            )}
          </div>
        </div>
      )}
      <button onClick={handleSubmit} className="dropzone__submit-button" disabled={!post}>
        POST
      </button>
    </div>
  );
};

export default MyPostWidget;
