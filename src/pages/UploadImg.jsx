import React, { useState } from 'react';
import axios from 'axios';

async function UploadIMG(array_img) {
  if (array_img.length === 0) return;
  const formData = new FormData();
  array_img.forEach(file => {
    formData.append('files', file);
  });
  const usernames = formData.getAll('files');
  const numberOfUsernames = usernames.length; 

  console.log(numberOfUsernames);
  try {
    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setUploadedImageUrls(response.data.imageUrls);
  } catch (error) {
    console.error('Upload Error:', error);
  }
}

const UploadImg = () => {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previews = selectedFiles.map(file => URL.createObjectURL(file));

    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    setFilePreviews(prevPreviews => [...prevPreviews, ...previews]);
  };

  const handleFileRemove = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setFilePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    const formData = new FormData();
    var index = 1;
    files.forEach(file => {
      formData.append('files', file);
    });
    const usernames = formData.getAll('files');
    const numberOfUsernames = usernames.length; 

    console.log(numberOfUsernames);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedImageUrls(response.data.imageUrls);
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit" style={{ margin: '10px 0' }}>Upload</button>
      </form>
      
      {files.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          {files.map((file, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', position: 'relative', width: '200px' }}>
              <span>{file.name}</span>
              <button
                onClick={() => handleFileRemove(index)}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  padding: '5px 10px',
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                }}
              >
                X
              </button>
            </div>
          ))}

          <h3>Previews:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {filePreviews.map((preview, index) => (
              <div key={index} style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', position: 'relative' }}>
                <img src={preview} alt={`Preview ${index}`} width="200" style={{ borderRadius: '5px' }} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {uploadedImageUrls.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {uploadedImageUrls.map((url, index) => (
              <div key={index} style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', position: 'relative' }}>
                <img src={url} alt={`Uploaded ${index}`} width="200" style={{ borderRadius: '5px' }} />
                <button
                  onClick={() => {
                    setUploadedImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
                  }}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: 'white',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    width: '25px',
                    height: '25px',
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImg;
