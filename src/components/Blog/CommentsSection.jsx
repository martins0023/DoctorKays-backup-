// File: src/components/blog/CommentsSection.jsx
import React, { useState } from 'react';
import { FaComment, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

/**
 * Recursive CommentItem component to render a comment or reply
 */
const CommentItem = ({ comment, fmtDate, onReplySubmit, onReact }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyName.trim() || !replyText.trim()) return;
    onReplySubmit(comment._key, { 
      _key: uuidv4(),
      name: replyName.trim(),
      text: replyText.trim(),
      postedAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: []
    });
    setReplyName('');
    setReplyText('');
    setShowReplyForm(false);
  };

  return (
    <li className="mb-6">
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">{comment.name}</span>
          <time className="text-xs text-gray-500">{fmtDate(comment.postedAt)}</time>
        </div>
        <p className="mb-4 text-gray-700">{comment.text}</p>
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={() => onReact(comment._key, 'like')}
            className="flex items-center gap-1 hover:text-blue-600 text-black"
          >
            <FaThumbsUp className="text-black" /> {comment.likes || 0}
          </button>
          <button
            onClick={() => onReact(comment._key, 'dislike')}
            className="flex items-center gap-1 hover:text-red-600 text-black"
          >
            <FaThumbsDown /> {comment.dislikes || 0}
          </button>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1 hover:text-green-600 text-black"
          >
            <FaComment /> Reply
          </button>
        </div>
      </div>

      {/* Reply form */}
      {showReplyForm && (
        <form onSubmit={handleReply} className="mt-3 ml-8 space-y-3">
          <input
            type="text"
            value={replyName}
            onChange={e => setReplyName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Your name"
            required
          />
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Your reply…"
            rows={2}
            required
          />
          <button
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-fuchsia-700 to-slate-500 text-white rounded-lg hover:opacity-90"
          >
            Post Reply
          </button>
        </form>
      )}

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <ul className="mt-4 ml-8 border-l pl-4">
          {comment.replies.map(reply => (
            <CommentItem
              key={reply._key}
              comment={reply}
              fmtDate={fmtDate}
              onReplySubmit={onReplySubmit}
              onReact={onReact}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const CommentsSection = ({ comments, onSubmit, onReplySubmit, onReact, isPosting, postError, newName, newText, setNewName, setNewText, fmtDate }) => (
  <section className="mb-16 mt-12">
    <h2 className="text-2xl font-semibold mb-6 border-b w-fit border-fuchsia-500">Comments</h2>

    <ul className="space-y-4 mb-8">
      {comments.length > 0 ? (
        comments.map(c => (
          <CommentItem
            key={c._key}
            comment={c}
            fmtDate={fmtDate}
            onReplySubmit={onReplySubmit}
            onReact={onReact}
          />
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </ul>

    {postError && <p className="text-red-500 mb-4">{postError}</p>}
    <form onSubmit={onSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg ">
      <h3 className="text-lg font-medium text-black">Leave a Comment</h3>
      <div>
        <label className="block text-sm text-gray-900 font-medium mb-1">Name</label>
        <input
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          disabled={isPosting}
          className="w-full border rounded-lg px-3 py-2 text-gray-800"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-900 font-medium mb-1">Comment</label>
        <textarea
          value={newText}
          onChange={e => setNewText(e.target.value)}
          disabled={isPosting}
          className="w-full border rounded-lg px-3 py-2 text-gray-800"
          placeholder="Your comment…"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isPosting}
        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white ${isPosting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-fuchsia-700 to-slate-500 hover:opacity-90'}`}
      >
        {isPosting ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
        ) : (
          'Post Comment'
        )}
      </button>
    </form>
  </section>
);

export default CommentsSection;
