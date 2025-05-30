// File: src/components/blog/Spinner.jsx
import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
  </div>
);

export default Spinner;