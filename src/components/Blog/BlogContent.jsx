// File: src/components/blog/BlogContent.jsx
import React from 'react';
import { PortableText } from '@portabletext/react';

const BlogContent = ({ description, components }) => (
  <p className="mt-6 text-lg leading-loose">
    <PortableText value={description} components={components} />
  </p>
);

export default BlogContent;