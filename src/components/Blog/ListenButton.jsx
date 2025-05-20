// File: src/components/blog/ListenButton.jsx
import React from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';

const ListenButton = ({ isSpeaking, handleSpeech }) => (
  <div className="mt-4 flex items-center gap-4 justify-center">
    <button
      onClick={handleSpeech}
      className="flex items-center gap-2 bg-gradient-to-l from-blue-600 to-gray-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
    >
      {isSpeaking ? <PauseCircle /> : <PlayCircle />}
      {isSpeaking ? 'Pause Audio' : 'Listen to Blog'}
    </button>
  </div>
);

export default ListenButton;