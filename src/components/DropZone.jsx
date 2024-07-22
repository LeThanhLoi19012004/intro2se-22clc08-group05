import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";
import "../assets/DropZone.css";
import { FaRegImage } from "react-icons/fa";

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
    const formData = new FormData();
    formData.append("description", post);
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    // Replace with your API endpoint
    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      body: formData,
    });

    if (response.success) {
      setPost("");
      setImages([]);
      alert("Post created successfully!");
    } else {
      alert("Failed to create post");
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
  }
  return (
    <div className="upload-widget">
      <div className="header">
        <img src={picturePath} alt="Profile" className="profile-img" />
        <textarea
          className="description-input"
          placeholder="What's on your mind..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
          rows="1"
        />
        <FaRegImage size={28} color="green" onClick={handleImgClick}/> 
      </div>
      {clickImg && <div className="image-section">
        <div className="image-container">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={URL.createObjectURL(image)} alt={`preview ${index}`} />
              <button onClick={() => handleRemoveImage(index)} className="icon-button">
                <FaTrash />
              </button>
            </div>
          ))}
          {images.length < 4 && (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {isDragReject ? <p>Only images are allowed</p> : <p>+</p>}
            </div>
          )}
        </div>
      </div>}
      <button onClick={handleSubmit} className="submit-button" disabled={!post}>
        POST
      </button>
    </div>
  );
};

export default MyPostWidget;
