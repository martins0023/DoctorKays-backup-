// File: src/components/blog/RecommendedArticles.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendedArticles = ({ recommendedArticles, category, slug, truncateText }) => {
  const navigate = useNavigate();
  if (!recommendedArticles.length) return (
    <div className="text-center text-gray-400 mt-6">
      <p>
        No related or recommended articles found for this blog post. Check out other blogs{' '}
        <a className="text-blue underline" href="/blog">here.</a>
      </p>
    </div>
  );
  return (
    <div className="mt-12 p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {recommendedArticles[0].category === category ? 'Related & Recommended Articles' : 'Featured Articles'}
      </h2>
      <div className="flex space-x-4 overflow-x-auto">
        {recommendedArticles.map(article => (
          <div
            key={article._id}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0 });
              navigate(`/blog/${article.slug.current}`, { state: article });
            }}
            className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px]  md:p-4 p-2 rounded-lg cursor-pointer"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
              <p className="text-sm text-primary font-medium">#{article.category}</p>
            </div>
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {truncateText(article.descriptionText, 20)}...<span> read more</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedArticles;