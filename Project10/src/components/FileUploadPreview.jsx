import React, { useState } from 'react';
import './FileUploadPreview.css';

const FileUploadPreview = () => {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const uploaded = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFiles(uploaded);
  };

  const getFilePreview = (fileObj) => {
    const { file, url } = fileObj;

    if (file.type.startsWith('image/')) {
      return <img src={url} alt={file.name} />;
    }

    if (file.type === 'application/pdf') {
      return (
        <iframe
          src={url}
          title={file.name}
          width="100%"
          height="300px"
          frameBorder="0"
        ></iframe>
      );
    }

    if (file.type.startsWith('video/')) {
      return (
        <video controls width="100%">
          <source src={url} type={file.type} />
          Your browser does not support the video tag.
        </video>
      );
    }

    return <p>Preview not available for this file type.</p>;
  };

  return (
    <div className="file-upload-container">
      <h2>📁 File Upload & Preview</h2>
      <input type="file" multiple onChange={handleChange} />
      <div className="preview-grid">
        {files.map((fileObj, index) => (
          <div className="preview-card" key={index}>
            <p><strong>{fileObj.file.name}</strong></p>
            <div className="preview">{getFilePreview(fileObj)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadPreview;
