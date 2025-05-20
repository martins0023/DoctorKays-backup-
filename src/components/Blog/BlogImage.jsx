// File: src/components/blog/BlogImage.jsx
import React from 'react';

const BlogImage = ({ imageUrl, alt }) => (
  <img
    src={imageUrl}
    alt={alt}
    className="w-full max-h-[400px] h-auto mt-6 rounded-lg object-cover"
  />
);

export default BlogImage;