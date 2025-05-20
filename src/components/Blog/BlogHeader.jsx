// File: src/components/blog/BlogHeader.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import SocialShare from '../SocialShare/SocialShare';

const BlogHeader = ({ category, title, date, author, post }) => (
  <div className="mt-6 p-4">
    <div className="flex justify-center mb-6">
      <p className="text-xs font-semibold rounded-full bg-purple-600 px-4 py-2">
        #{category}
      </p>
    </div>
    <h1 className="text-4xl font-bold text-center">{title}</h1>
    <div className="mt-4 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Calendar />
        <p className="text-sm font-medium">{date}</p>
      </div>
      <p className="text-sm font-medium">By {author}</p>
    </div>
    <SocialShare post={post} />
  </div>
);

export default BlogHeader;