// File: src/components/blog/ReactionButtons.jsx
import React from 'react';

const ReactionButtons = ({ likes, dislikes, onLike, onDislike }) => (
  <div className="mt-4 flex items-center gap-4 justify-center">
    <button onClick={onLike} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
      👍 Like {likes}
    </button>
    
  </div>
);

export default ReactionButtons;