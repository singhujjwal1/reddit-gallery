// Gallery.js
"use client";

import React, { useState } from 'react';
import { Gallery as PhotoSwipeGallery } from 'react-photoswipe-gallery';

const Gallery = ({ posts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-8 text-center">Reddit Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="cursor-pointer overflow-hidden aspect-ratio-square" onClick={() => openGallery(index)}>
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-contain rounded-lg shadow transition duration-300 transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <PhotoSwipeGallery
          isOpen={isOpen}
          onClose={closeGallery}
          items={posts.map((post) => ({
            original: post.url,
            thumbnail: post.thumbnail,
            w: post.preview.images[0].source.width,
            h: post.preview.images[0].source.height,
            title: post.title,
          }))}
          options={{ index: currentIndex }}
        />
      )}
    </div>
  );
};

export default Gallery;
