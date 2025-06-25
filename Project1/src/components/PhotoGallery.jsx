import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import './PhotoGallery.css'; // Your custom styling

const images = [
  '/assets/img1.jpeg',
  '/assets/img2.jpeg',
  '/assets/img3.jpeg',
  '/assets/img4.jpeg',
  '/assets/img5.jpeg',
  '/assets/img6.jpeg',
  '/assets/img7.jpeg',
  // Add more image paths
];

const PhotoGallery = () => {
  return (
    <div className="gallery-container">
      <h2>📷 Photo Gallery</h2>
      <PhotoProvider>
        <div className="gallery-grid">
          {images.map((src, i) => (
            <PhotoView key={i} src={src}>
              <img src={src} alt={`img-${i}`} className="gallery-thumb" />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
};

export default PhotoGallery;
